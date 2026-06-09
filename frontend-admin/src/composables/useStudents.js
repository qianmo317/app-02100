import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'student_list'
const COUNTER_KEY = 'student_counter'
const PAGE_SIZE = 5

// 默认学生数据
const defaultStudents = [
  { id: 'STU001', name: '张三', major: '计算机科学与技术', grade: '大一' },
  { id: 'STU002', name: '李四', major: '软件工程', grade: '大二' },
  { id: 'STU003', name: '王五', major: '信息安全', grade: '大三' }
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
    return stored ? parseInt(stored, 10) : 3
  } catch {
    return 3
  }
}

const students = ref(loadStudents())
let studentCounter = loadCounter()

// 筛选与分页状态（模块级单例，跨组件共享）
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(PAGE_SIZE)

// 监听数据变化，自动保存到 localStorage
watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

const saveCounter = () => {
  localStorage.setItem(COUNTER_KEY, String(studentCounter))
}

export function useStudents() {
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

  const updateStudent = (id, payload) => {
    const target = students.value.find(s => s.id === id)
    if (target) {
      target.name = payload.name
      target.major = payload.major
      target.grade = payload.grade
      return true
    }
    return false
  }

  const deleteStudent = (id) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value.splice(index, 1)
      return true
    }
    return false
  }

  const studentCount = computed(() => students.value.length)

  // 按姓名或专业关键字筛选
  const filteredStudents = computed(() => {
    const keyword = searchKeyword.value.trim().toLowerCase()
    if (!keyword) return students.value
    return students.value.filter((s) => {
      return (
        s.name.toLowerCase().includes(keyword) ||
        s.major.toLowerCase().includes(keyword)
      )
    })
  })

  const filteredCount = computed(() => filteredStudents.value.length)

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredCount.value / pageSize.value))
  })

  // 当前页对应的数据切片
  const pagedStudents = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredStudents.value.slice(start, start + pageSize.value)
  })

  // 搜索关键字变化时回到第一页
  watch(searchKeyword, () => {
    currentPage.value = 1
  })

  // 数据量变化时，避免当前页超出总页数
  watch(totalPages, (max) => {
    if (currentPage.value > max) {
      currentPage.value = max
    }
  })

  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword ?? ''
  }

  const setCurrentPage = (page) => {
    const target = Number(page)
    if (!Number.isFinite(target)) return
    const safe = Math.min(Math.max(1, Math.floor(target)), totalPages.value)
    currentPage.value = safe
  }

  const resetPagination = () => {
    currentPage.value = 1
  }

  return {
    students,
    studentCount,
    addStudent,
    updateStudent,
    deleteStudent,
    // 筛选与分页
    searchKeyword,
    currentPage,
    pageSize,
    filteredStudents,
    filteredCount,
    totalPages,
    pagedStudents,
    setSearchKeyword,
    setCurrentPage,
    resetPagination
  }
}
