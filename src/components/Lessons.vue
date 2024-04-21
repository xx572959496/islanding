<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getLessonsList} from "../api/api.js";
import {useLessonsListStore} from "../stores/index.js";
import {formatDate} from "../utils/date.js";

const lessonsListStore = useLessonsListStore()

const date = ref(new Date().toDateString())

const floating = ref(false)

const initLessonData = {
  title:'',
  provenance:'',
  author: {
    name:'',
  },
  article:''
}

const state = reactive({
  lessonData: initLessonData,
  loading: true
})

onMounted(() => {
  // 加载当天日期的文章
  handleData(Date.now().toString().substring(0,10))
})

const handleData = (date) => {
  getLessonsList(date, (data) => {
    lessonsListStore.lessonsList = data
    const nowDate = formatDate(new Date(date * 1000));
    // const nowDate = formatDate(new Date())
    state.lessonData = lessonsListStore.lessonsList.find(item => {
      return item.date_by_day.toString() === nowDate.toString()
    })
    state.loading = false
  })
}

const dateChangeHandler = (selectDate) => {
  state.loading = true
  state.lessonData = initLessonData
  const findDate = selectDate.replaceAll('-','');
  const findItem = lessonsListStore.lessonsList.find(item => {
    return item.date_by_day.toString() === findDate
  })
  if (findItem != null) {
    // findItem.article = findItem.article.trim().replace(/\n/g, '<br/>')
    state.lessonData = findItem
    state.loading = false
    return
  }
  handleData(Date.parse(selectDate).toString().substring(0,10))
}
const showFloating = () => {
  floating.value = true;
}

</script>

<template>
  <var-space direction="column" justify="center">
    <var-row>
      <var-date-picker hint="" @change="dateChangeHandler" elevation="1" :max="new Date().toDateString()" v-model="date" >
        <template #date="date">
          <div class="date-picker-date">
            {{ date.month}}-{{ date.date}}<var-chip v-show="!state.loading" type="success">{{ state.lessonData.title }}</var-chip>
          </div>
        </template>
      </var-date-picker>
    </var-row>
    <var-row>
      <var-col>
        <var-card
            @click="showFloating"
            :title="state.lessonData.provenance"
            :subtitle="state.lessonData.author.name"
            v-model:floating="floating"
            ripple
        >
          <template #description>
            <var-skeleton :rows="8" :title-width="80" :rows-width="['50px']" title :loading="state.loading">
              <var-ellipsis :line-clamp="6" :tooltip="false">
                <div class="description" v-html="state.lessonData.article"/>
              </var-ellipsis>
            </var-skeleton>
          </template>
          <template #floating-content>
            <div class="floating-content-main">
              <var-divider dashed />
              <div class="floating-content" v-for="(item, index) in state.lessonData.article.split('\n')" :id="index" v-html="item === '' ? '<br>' : item"/>
            </div>
          </template>
        </var-card>
      </var-col>

    </var-row>
  </var-space>
</template>

<style scoped>
.description {
  font-size: var(--card-description-font-size);
  color: var(--card-description-color);
  margin: var(--card-description-margin);
  padding: var(--card-description-padding);
  word-break: break-all;
  transition: padding 0.25s, margin 0.25s, font-size 0.25s;
  white-space: break-spaces;
}
.floating-content {
  padding: var(--card-description-padding);
  color: var(--color-text);
  font-size: var(--font-size-lg);
  line-height: 2;
  text-indent: 2em;
}
div#\30 {
  padding-top: 12px;
}
.floating-content-main {
  padding-bottom: 60px;
}
.date-picker-date {
  display: flex;
  align-items: center;
  gap: 4vh;
}
</style>