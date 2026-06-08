import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'student_list'
const COUNTER_KEY = 'student_counter'

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

  const deleteStudent = (id) => {
    const index = students.value.findIndex(s => s.id === id)
    if (index > -1) {
      students.value.splice(index, 1)
      return true
    }
    return false
  }

  const studentCount = computed(() => students.value.length)

  return {
    students,
    studentCount,
    addStudent,
    deleteStudent
  }
}
