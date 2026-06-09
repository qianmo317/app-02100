import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'student_list'
const COUNTER_KEY = 'student_counter'

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
  const searchKeyword = ref('')
  const currentPage = ref(1)
  const pageSize = ref(10)

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

  const updateStudent = (id, data) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value[index] = { ...students.value[index], ...data }
      return true
    }
    return false
  }

  const deleteStudent = (id) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value.splice(index, 1)
      if (currentPage.value > totalPages.value && totalPages.value > 0) {
        currentPage.value = totalPages.value
      }
      return true
    }
    return false
  }

  const studentCount = computed(() => students.value.length)

  const filteredStudents = computed(() => {
    const keyword = searchKeyword.value.trim().toLowerCase()
    if (!keyword) return students.value
    return students.value.filter(s =>
      s.name.toLowerCase().includes(keyword) ||
      s.major.toLowerCase().includes(keyword)
    )
  })

  const filteredCount = computed(() => filteredStudents.value.length)

  const totalPages = computed(() => Math.ceil(filteredCount.value / pageSize.value) || 1)

  const pagedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredStudents.value.slice(start, start + pageSize.value)
  })

  const handleSearch = (keyword) => {
    searchKeyword.value = keyword
    currentPage.value = 1
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
  }

  const handlePageSizeChange = (size) => {
    pageSize.value = size
    currentPage.value = 1
  }

  watch(searchKeyword, () => {
    currentPage.value = 1
  })

  return {
    students,
    studentCount,
    addStudent,
    updateStudent,
    deleteStudent,
    searchKeyword,
    currentPage,
    pageSize,
    filteredStudents,
    filteredCount,
    totalPages,
    pagedStudents,
    handleSearch,
    handlePageChange,
    handlePageSizeChange
  }
}
