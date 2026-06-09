<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <header class="el-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo-wrapper">
            <span class="logo-icon">🎓</span>
            <h1 class="logo-title">学生信息管理系统</h1>
          </div>
        </div>
        <div class="header-right">
          <div class="user-dropdown" @click="toggleDropdown" v-click-outside="closeDropdown">
            <div class="user-avatar">
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
                <path d="M512 304c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-52.9 0-96-43.1-96-96s43.1-96 96-96 96 43.1 96 96-43.1 96-96 96zm0 128c-167.7 0-312.4 99.5-378.4 242.8 35.3 39.7 77.8 72.5 125.4 96.4C302.4 940.8 402.5 884 512 884s209.6 56.8 253 143.2c47.6-23.9 90.1-56.7 125.4-96.4C824.4 787.5 679.7 688 512 688z"/>
              </svg>
            </div>
            <span class="username">{{ username === 'admin' ? '超级管理员' : username }}</span>
            <svg class="dropdown-arrow" :class="{ 'is-open': showDropdown }" viewBox="0 0 1024 1024">
              <path d="M488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z" fill="currentColor"/>
            </svg>
            <Transition name="el-zoom-in-top">
              <div v-if="showDropdown" class="dropdown-menu">
                <div class="dropdown-item" @click="handleLogout">
                  <svg viewBox="0 0 1024 1024" fill="currentColor">
                    <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/>
                  </svg>
                  退出登录
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="el-main">
      <div class="main-container">
        <!-- 统计卡片 -->
        <div class="stats-row">
          <div class="stat-card stat-card--primary">
            <div class="stat-icon">
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"/>
                <path d="M512 304c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-52.9 0-96-43.1-96-96s43.1-96 96-96 96 43.1 96 96-43.1 96-96 96z"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ studentCount }}</div>
              <div class="stat-label">学生总数</div>
            </div>
          </div>
          <div class="stat-card stat-card--success">
            <div class="stat-icon">
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/>
                <path d="M492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0 40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0 40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ gradeOptions.length }}</div>
              <div class="stat-label">年级数量</div>
            </div>
          </div>
          <div class="stat-card stat-card--warning">
            <div class="stat-icon">
              <svg viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136V232h752v560z"/>
                <path d="M610.3 476h-82.6c-1.7 0-3.1 1.4-3.1 3.1v45.8c0 1.7 1.4 3.1 3.1 3.1h82.6c1.7 0 3.1-1.4 3.1-3.1v-45.8c0-1.7-1.4-3.1-3.1-3.1zm0 144h-82.6c-1.7 0-3.1 1.4-3.1 3.1v45.8c0 1.7 1.4 3.1 3.1 3.1h82.6c1.7 0 3.1-1.4 3.1-3.1v-45.8c0-1.7-1.4-3.1-3.1-3.1zM496.3 332h-82.6c-1.7 0-3.1 1.4-3.1 3.1v45.8c0 1.7 1.4 3.1 3.1 3.1h82.6c1.7 0 3.1-1.4 3.1-3.1v-45.8c0-1.7-1.4-3.1-3.1-3.1zm0 144h-82.6c-1.7 0-3.1 1.4-3.1 3.1v45.8c0 1.7 1.4 3.1 3.1 3.1h82.6c1.7 0 3.1-1.4 3.1-3.1v-45.8c0-1.7-1.4-3.1-3.1-3.1zm0 144h-82.6c-1.7 0-3.1 1.4-3.1 3.1v45.8c0 1.7 1.4 3.1 3.1 3.1h82.6c1.7 0 3.1-1.4 3.1-3.1v-45.8c0-1.7-1.4-3.1-3.1-3.1z"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ majorCount }}</div>
              <div class="stat-label">专业数量</div>
            </div>
          </div>
        </div>

        <!-- 学生列表卡片 -->
        <section class="el-card">
          <div class="el-card__header">
            <div class="card-title-wrapper">
              <svg class="card-icon" viewBox="0 0 1024 1024" fill="currentColor">
                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"/>
                <path d="M492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0 40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0 40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"/>
              </svg>
              <span class="card-title">学生列表</span>
              <span class="el-tag">共 {{ filteredCount }} 人</span>
            </div>
            <BaseButton type="primary" @click="openAddModal">
              <svg viewBox="0 0 1024 1024" fill="currentColor" class="btn-icon">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"/>
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"/>
              </svg>
              添加学生
            </BaseButton>
          </div>
          <div class="el-card__body">
            <div class="search-bar">
              <div class="search-input-wrapper">
                <svg class="search-icon" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 714 478.4 714 408c0-167.6-136.4-304-304-304S106 240.4 106 408s136.4 304 304 304c70.4 0 134.7-23.8 186.8-64.2l259.7 259.6a8.2 8.2 0 0 0 11.6 0l41-40.9a8.2 8.2 0 0 0 0-11.6zM410 676c-147.1 0-268-120.9-268-268s120.9-268 268-268 268 120.9 268 268-120.9 268-268 268z"/>
                </svg>
                <input
                  type="text"
                  class="search-input"
                  placeholder="按姓名或专业搜索..."
                  :value="searchKeyword"
                  @input="handleSearch($event.target.value)"
                />
                <svg v-if="searchKeyword" class="search-clear" viewBox="0 0 1024 1024" fill="currentColor" @click="handleSearch('')">
                  <path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/>
                </svg>
              </div>
            </div>
            <DataTable :columns="columns" :data="pagedStudents">
              <template #id="{ row }">
                <span class="student-id">{{ row.id }}</span>
              </template>
              <template #name="{ row }">
                <div class="student-name">
                  <span class="name-avatar">{{ row.name.charAt(0) }}</span>
                  <span>{{ row.name }}</span>
                </div>
              </template>
              <template #grade="{ row }">
                <span class="el-tag el-tag--info">{{ row.grade }}</span>
              </template>
              <template #actions="{ row }">
                <div class="action-buttons">
                  <BaseButton type="primary" size="small" plain @click="openEditModal(row)">
                    编辑
                  </BaseButton>
                  <BaseButton type="danger" size="small" plain @click="openDeleteConfirm(row)">
                    删除
                  </BaseButton>
                </div>
              </template>
            </DataTable>
            <div class="pagination">
              <div class="pagination-info">
                第 {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, filteredCount) }} 条，共 {{ filteredCount }} 条
              </div>
              <div class="pagination-controls">
                <button class="pagination-btn" :disabled="currentPage <= 1" @click="handlePageChange(1)">
                  <svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M872 572H268.8l154.4 154.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-208-208c-12.5-12.5-12.5-32.8 0-45.3l208-208c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L268.8 508H872c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/><path d="M392 572H268.8l154.4 154.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-208-208c-12.5-12.5-12.5-32.8 0-45.3l208-208c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L268.8 508H392c17.7 0 32 14.3 32 32s-14.3 32-32 32z" transform="translate(480,0)"/></svg>
                </button>
                <button class="pagination-btn" :disabled="currentPage <= 1" @click="handlePageChange(currentPage - 1)">
                  <svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M872 572H268.8l154.4 154.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-208-208c-12.5-12.5-12.5-32.8 0-45.3l208-208c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L268.8 508H872c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                </button>
                <template v-for="page in paginationPages" :key="page">
                  <span v-if="page === '...'" class="pagination-ellipsis">...</span>
                  <button v-else class="pagination-btn pagination-btn--page" :class="{ 'is-active': page === currentPage }" @click="handlePageChange(page)">
                    {{ page }}
                  </button>
                </template>
                <button class="pagination-btn" :disabled="currentPage >= totalPages" @click="handlePageChange(currentPage + 1)">
                  <svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M152 572h603.2L600.8 726.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l208-208c12.5-12.5 12.5-32.8 0-45.3l-208-208c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L755.2 508H152c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
                </button>
                <button class="pagination-btn" :disabled="currentPage >= totalPages" @click="handlePageChange(totalPages)">
                  <svg viewBox="0 0 1024 1024" fill="currentColor"><path d="M152 572h603.2L600.8 726.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l208-208c12.5-12.5 12.5-32.8 0-45.3l-208-208c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L755.2 508H152c-17.7 0-32 14.3-32 32s14.3 32 32 32z" transform="translate(-480,0)"/><path d="M152 572h603.2L600.8 726.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l208-208c12.5-12.5 12.5-32.8 0-45.3l-208-208c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L755.2 508H152c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
                </button>
              </div>
              <div class="pagination-jump">
                前往
                <input type="number" class="pagination-jump-input" :value="currentPage" @change="handlePageChange(Number($event.target.value))" min="1" :max="totalPages" />
                页
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="el-footer">
      <p>© 2024 学生信息管理系统 · 基于 Vue 3 + Vite 构建</p>
    </footer>

    <!-- 添加/编辑学生弹窗 -->
    <BaseModal
      v-model:visible="showStudentModal"
      :title="isEditing ? '编辑学生信息' : '添加新学生'"
      width="500px"
    >
      <form class="student-form" @submit.prevent="handleSubmit">
        <BaseInput
          v-model="form.name"
          label="姓名"
          placeholder="请输入学生姓名"
          :error="errors.name"
        />
        <BaseInput
          v-model="form.major"
          label="专业"
          placeholder="请输入专业名称"
          :error="errors.major"
        />
        <BaseSelect
          v-model="form.grade"
          label="年级"
          placeholder="请选择年级"
          :options="gradeOptions"
          :error="errors.grade"
        />
      </form>
      <template #footer>
        <BaseButton type="default" @click="showStudentModal = false">取 消</BaseButton>
        <BaseButton type="primary" :loading="isSubmitting" @click="handleSubmit">
          {{ isEditing ? '保 存' : '确 定' }}
        </BaseButton>
      </template>
    </BaseModal>

    <!-- 删除确认弹窗 -->
    <ConfirmDialog
      v-model:visible="showDeleteConfirm"
      type="danger"
      title="删除确认"
      :message="`确定要删除学生「${deleteTarget?.name}」吗？删除后数据将无法恢复。`"
      confirm-text="确认删除"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
import DataTable from '../components/DataTable.vue'
import BaseModal from '../components/BaseModal.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { useAuth } from '../composables/useAuth'
import { useStudents } from '../composables/useStudents'
import { useToast } from '../composables/useToast'

const { logout, getUsername } = useAuth()
const { students, studentCount, filteredCount, totalPages, currentPage, pageSize, searchKeyword, pagedStudents, addStudent, updateStudent, deleteStudent, handleSearch, handlePageChange } = useStudents()
const toast = useToast()

const username = computed(() => getUsername())
const showDropdown = ref(false)
const showStudentModal = ref(false)
const showDeleteConfirm = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const editingId = ref(null)
const deleteTarget = ref(null)

const paginationPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 4) pages.push('...')
    const start = Math.max(2, current - 2)
    const end = Math.min(total - 1, current + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    if (current < total - 3) pages.push('...')
    pages.push(total)
  }
  return pages
})

// 计算专业数量
const majorCount = computed(() => {
  const majors = new Set(students.value.map(s => s.major))
  return majors.size
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
  showDropdown.value = false
}

const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}

const form = reactive({
  name: '',
  major: '',
  grade: ''
})

const errors = reactive({
  name: '',
  major: '',
  grade: ''
})

const gradeOptions = [
  { value: '大一', label: '大一' },
  { value: '大二', label: '大二' },
  { value: '大三', label: '大三' },
  { value: '大四', label: '大四' },
  { value: '研一', label: '研一' },
  { value: '研二', label: '研二' },
  { value: '研三', label: '研三' }
]

const columns = [
  { key: 'id', title: '学号', width: '120px' },
  { key: 'name', title: '姓名', width: '160px' },
  { key: 'major', title: '专业' },
  { key: 'grade', title: '年级', width: '100px' },
  { key: 'actions', title: '操作', width: '160px' }
]

const resetForm = () => {
  form.name = ''
  form.major = ''
  form.grade = ''
  errors.name = ''
  errors.major = ''
  errors.grade = ''
}

const openAddModal = () => {
  isEditing.value = false
  editingId.value = null
  resetForm()
  showStudentModal.value = true
}

const openEditModal = (student) => {
  isEditing.value = true
  editingId.value = student.id
  form.name = student.name
  form.major = student.major
  form.grade = student.grade
  errors.name = ''
  errors.major = ''
  errors.grade = ''
  showStudentModal.value = true
}

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.major = ''
  errors.grade = ''

  if (!form.name.trim()) {
    errors.name = '请输入学生姓名'
    isValid = false
  }

  if (!form.major.trim()) {
    errors.major = '请输入专业名称'
    isValid = false
  }

  if (!form.grade) {
    errors.grade = '请选择年级'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 500))

  if (isEditing.value) {
    updateStudent(editingId.value, {
      name: form.name.trim(),
      major: form.major.trim(),
      grade: form.grade
    })
    toast.success(`学生「${form.name}」信息已更新`)
  } else {
    const newStudent = addStudent({
      name: form.name.trim(),
      major: form.major.trim(),
      grade: form.grade
    })
    toast.success(`学生「${newStudent.name}」添加成功`)
  }

  isSubmitting.value = false
  showStudentModal.value = false
  resetForm()
}

const openDeleteConfirm = (student) => {
  deleteTarget.value = student
  showDeleteConfirm.value = true
}

const confirmDelete = () => {
  if (deleteTarget.value) {
    deleteStudent(deleteTarget.value.id)
    toast.success(`学生「${deleteTarget.value.name}」已删除`)
    deleteTarget.value = null
  }
}

const handleLogout = () => {
  closeDropdown()
  logout()
  toast.info('已退出登录')
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-page);
}

/* 顶部导航栏 */
.el-header {
  background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.logo-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header-right {
  display: flex;
  align-items: center;
}

/* 用户下拉菜单 */
.user-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: var(--border-radius-round);
  background: rgba(255, 255, 255, 0.15);
  transition: all var(--transition-fast);
}

.user-dropdown:hover {
  background: rgba(255, 255, 255, 0.25);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.user-avatar svg {
  width: 20px;
  height: 20px;
}

.username {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: #fff;
}

.dropdown-arrow {
  width: 12px;
  height: 12px;
  color: rgba(255, 255, 255, 0.8);
  transition: transform var(--transition-fast);
  transform: rotate(180deg);
}

.dropdown-arrow.is-open {
  transform: rotate(0deg);
}

/* 下拉菜单 */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 150px;
  background: var(--color-bg-overlay);
  border: 1px solid var(--color-border-lighter);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: var(--font-size-base);
  color: var(--color-text-regular);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.dropdown-item:hover {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
}

/* 主内容区 */
.el-main {
  flex: 1;
  padding: 24px;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 统计卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-card {
  background: var(--color-bg-container);
  border-radius: var(--border-radius-md);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--shadow-lighter);
  border: 1px solid var(--color-border-lighter);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 28px;
  height: 28px;
}

.stat-card--primary .stat-icon {
  background: var(--color-primary-light-9);
  color: var(--color-primary);
}

.stat-card--success .stat-icon {
  background: var(--color-success-light);
  color: var(--color-success);
}

.stat-card--warning .stat-icon {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
  margin-top: 4px;
}

/* 卡片样式 */
.el-card {
  background: var(--color-bg-container);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-lighter);
  box-shadow: var(--shadow-lighter);
  overflow: hidden;
}

.el-card__header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-lighter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, var(--color-fill-lighter) 0%, var(--color-bg-container) 100%);
}

.card-title-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
}

.card-title {
  font-size: var(--font-size-medium);
  font-weight: 600;
  color: var(--color-text-primary);
}

.el-tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  font-size: var(--font-size-extra-small);
  border-radius: var(--border-radius-base);
  white-space: nowrap;
}

.el-tag--info {
  background-color: var(--color-info-light);
  border: 1px solid #d3d4d6;
  color: var(--color-info);
}

.el-card__body {
  padding: 20px;
}

/* 学生ID样式 */
.student-id {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
  background: var(--color-fill-light);
  padding: 4px 10px;
  border-radius: var(--border-radius-base);
  border: 1px solid var(--color-border-lighter);
}

/* 学生姓名样式 */
.student-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name-avatar {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-primary-light-7) 0%, var(--color-primary-light-5) 100%);
  color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-small);
  font-weight: 600;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 8px;
}

/* 搜索栏 */
.search-bar {
  margin-bottom: 16px;
}

.search-input-wrapper {
  position: relative;
  max-width: 360px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-placeholder);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 36px 0 36px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-base);
  color: var(--color-text-regular);
  background: var(--color-bg-container);
  outline: none;
  transition: border-color var(--transition-fast);
  box-sizing: border-box;
}

.search-input::placeholder {
  color: var(--color-text-placeholder);
}

.search-input:hover {
  border-color: var(--color-text-placeholder);
}

.search-input:focus {
  border-color: var(--color-primary);
}

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: var(--color-text-placeholder);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.search-clear:hover {
  color: var(--color-text-regular);
}

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-lighter);
  flex-wrap: wrap;
  gap: 12px;
}

.pagination-info {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border: 1px solid var(--color-border-lighter);
  border-radius: var(--border-radius-base);
  background: var(--color-bg-container);
  color: var(--color-text-regular);
  font-size: var(--font-size-small);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.pagination-btn svg {
  width: 12px;
  height: 12px;
}

.pagination-btn:hover:not(:disabled):not(.is-active) {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.pagination-btn:disabled {
  color: var(--color-text-placeholder);
  cursor: not-allowed;
  background: var(--color-fill-lighter);
}

.pagination-btn.is-active {
  color: #fff;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.pagination-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  color: var(--color-text-placeholder);
  font-size: var(--font-size-small);
}

.pagination-jump {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--font-size-small);
  color: var(--color-text-regular);
}

.pagination-jump-input {
  width: 50px;
  height: 32px;
  text-align: center;
  border: 1px solid var(--color-border-lighter);
  border-radius: var(--border-radius-base);
  font-size: var(--font-size-small);
  color: var(--color-text-regular);
  outline: none;
  transition: border-color var(--transition-fast);
  -moz-appearance: textfield;
}

.pagination-jump-input::-webkit-inner-spin-button,
.pagination-jump-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pagination-jump-input:focus {
  border-color: var(--color-primary);
}

.btn-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

/* 表单样式 */
.student-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 页脚 */
.el-footer {
  background: var(--color-bg-container);
  border-top: 1px solid var(--color-border-lighter);
  padding: 16px;
  text-align: center;
}

.el-footer p {
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}

/* 动画 */
.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
  transform-origin: center top;
}

.el-zoom-in-top-enter-from,
.el-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: 1fr;
  }

  .header-content {
    padding: 0 16px;
  }

  .logo-title {
    font-size: 16px;
  }

  .el-card__header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .action-buttons {
    flex-direction: column;
  }

  .pagination {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input-wrapper {
    max-width: 100%;
  }
}
</style>
