import { ref, computed, watch, onUnmounted } from 'vue'
import debounce from 'lodash/debounce'

const STORAGE_KEY = 'student_list'
const COUNTER_KEY = 'student_counter'
const DEFAULT_PAGE_SIZE = 10
const SEARCH_DEBOUNCE_DELAY = 300

const defaultStudents = [
  { id: 'STU001', name: '张三', major: '计算机科学与技术', grade: '大一' },
  { id: 'STU002', name: '李四', major: '软件工程', grade: '大二' },
  { id: 'STU003', name: '王五', major: '信息安全', grade: '大三' }
]

const loadStudents = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultStudents
  } catch {
    return defaultStudents
  }
}

const loadCounter = () => {
  try {
    const stored = localStorage.getItem(COUNTER_KEY)
    return stored ? parseInt(stored, 10) : 3
  } catch {
    return 3
  }
}

const students = ref(loadStudents())
let studentCounter = loadCounter()

watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

const saveCounter = () => {
  localStorage.setItem(COUNTER_KEY, String(studentCounter))
}

export function useStudents() {
  const searchInput = ref('')
  const activeKeyword = ref('')
  const currentPage = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)

  const applySearch = debounce((keyword) => {
    activeKeyword.value = keyword.trim().toLowerCase()
    currentPage.value = 1
  }, SEARCH_DEBOUNCE_DELAY)

  watch(searchInput, (newVal) => {
    applySearch(newVal)
  })

  watch(activeKeyword, () => {
    const maxPage = Math.max(1, Math.ceil(filteredStudents.value.length / pageSize.value))
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage
    }
  })

  onUnmounted(() => {
    applySearch.cancel()
  })

  const generateId = () => {
    studentCounter++
    saveCounter()
    return `STU${String(studentCounter).padStart(3, '0')}`
  }

  const addStudent = (student) => {
    const newStudent = {
      id: generateId(),
      name: student.name,
      major: student.major,
      grade: student.grade
    }
    students.value.push(newStudent)
    return newStudent
  }

  const updateStudent = (id, updatedData) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value[index] = { ...students.value[index], ...updatedData }
      return students.value[index]
    }
    return null
  }

  const deleteStudent = (id) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value.splice(index, 1)
      const maxPage = Math.max(1, Math.ceil(filteredStudents.value.length / pageSize.value))
      if (currentPage.value > maxPage) {
        currentPage.value = maxPage
      }
      return true
    }
    return false
  }

  const studentCount = computed(() => students.value.length)

  const filteredStudents = computed(() => {
    const keyword = activeKeyword.value
    if (!keyword) {
      return students.value
    }
    return students.value.filter(student => {
      const nameMatch = student.name.toLowerCase().includes(keyword)
      const majorMatch = student.major.toLowerCase().includes(keyword)
      return nameMatch || majorMatch
    })
  })

  const totalCount = computed(() => filteredStudents.value.length)

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(totalCount.value / pageSize.value))
  })

  const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredStudents.value.slice(start, end)
  })

  const setPageSize = (size) => {
    pageSize.value = size
    currentPage.value = 1
  }

  return {
    students,
    studentCount,
    addStudent,
    updateStudent,
    deleteStudent,
    searchInput,
    activeKeyword,
    currentPage,
    pageSize,
    filteredStudents,
    paginatedStudents,
    totalCount,
    totalPages,
    setPageSize
  }
}
