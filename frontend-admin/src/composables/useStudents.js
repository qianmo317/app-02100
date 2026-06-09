import { ref, computed, watch, onUnmounted } from 'vue'
import { debounce } from 'lodash-es'

const STORAGE_KEY = 'student_list'
const COUNTER_KEY = 'student_counter'
const DEFAULT_PAGE_SIZE = 10
const SEARCH_DEBOUNCE_DELAY = 300

// 默认学生数据
const defaultStudents = [
  { id: 'STU001', name: '张三', major: '计算机科学与技术', grade: '大一' },
  { id: 'STU002', name: '李四', major: '软件工程', grade: '大二' },
  { id: 'STU003', name: '王五', major: '信息安全', grade: '大三' },
  { id: 'STU004', name: '赵六', major: '计算机科学与技术', grade: '大二' },
  { id: 'STU005', name: '钱七', major: '软件工程', grade: '大三' },
  { id: 'STU006', name: '孙八', major: '人工智能', grade: '大一' },
  { id: 'STU007', name: '周九', major: '数据科学', grade: '大二' },
  { id: 'STU008', name: '吴十', major: '信息安全', grade: '大四' },
  { id: 'STU009', name: '郑十一', major: '计算机科学与技术', grade: '大三' },
  { id: 'STU010', name: '王十二', major: '软件工程', grade: '大一' },
  { id: 'STU011', name: '冯十三', major: '人工智能', grade: '研一' },
  { id: 'STU012', name: '陈十四', major: '数据科学', grade: '研二' }
]

// 从 localStorage 读取数据
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
    return stored ? parseInt(stored, 10) : 12
  } catch {
    return 12
  }
}

const students = ref(loadStudents())
let studentCounter = loadCounter()

// 监听数据变化，自动保存到 localStorage
watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

const saveCounter = () => {
  localStorage.setItem(COUNTER_KEY, String(studentCounter))
}

export function useStudents() {
  const searchKeyword = ref('')
  const debouncedSearchKeyword = ref('')
  const currentPage = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)

  const debouncedUpdateSearch = debounce((value) => {
    debouncedSearchKeyword.value = value
  }, SEARCH_DEBOUNCE_DELAY)

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

  const updateStudent = (id, student) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value[index] = {
        ...students.value[index],
        ...student
      }
      return true
    }
    return false
  }

  const deleteStudent = (id) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value.splice(index, 1)
      const totalPages = Math.ceil(filteredStudents.value.length / pageSize.value)
      if (currentPage.value > totalPages && totalPages > 0) {
        currentPage.value = totalPages
      }
      return true
    }
    return false
  }

  const studentCount = computed(() => students.value.length)

  const filteredStudents = computed(() => {
    if (!debouncedSearchKeyword.value.trim()) {
      return students.value
    }
    const keyword = debouncedSearchKeyword.value.toLowerCase().trim()
    return students.value.filter(student =>
      student.name.toLowerCase().includes(keyword) ||
      student.major.toLowerCase().includes(keyword)
    )
  })

  const filteredCount = computed(() => filteredStudents.value.length)

  const totalPages = computed(() => Math.ceil(filteredStudents.value.length / pageSize.value))

  const paginatedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredStudents.value.slice(start, end)
  })

  const setSearchKeyword = (keyword) => {
    debouncedUpdateSearch.cancel()
    searchKeyword.value = keyword
    debouncedSearchKeyword.value = keyword
    currentPage.value = 1
  }

  const setCurrentPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const setPageSize = (size) => {
    pageSize.value = size
    currentPage.value = 1
  }

  const goToFirstPage = () => {
    currentPage.value = 1
  }

  const goToLastPage = () => {
    currentPage.value = totalPages.value
  }

  const goToPrevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  watch(searchKeyword, (newVal) => {
    debouncedUpdateSearch(newVal)
  })

  watch(debouncedSearchKeyword, () => {
    currentPage.value = 1
  })

  onUnmounted(() => {
    debouncedUpdateSearch.cancel()
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
    paginatedStudents,
    setSearchKeyword,
    setCurrentPage,
    setPageSize,
    goToFirstPage,
    goToLastPage,
    goToPrevPage,
    goToNextPage
  }
}
