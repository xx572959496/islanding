<script setup>
import {onMounted, reactive, ref} from 'vue'
import {getActivityStats, getCommentComments, getLessonComments, getLessonsList} from "../api/api.js";
import {useLessonsListStore} from "../stores/index.js";
import {formatDate, getDateDiff} from "../utils/date.js";
import {randomArray} from "../utils/array.js";
import {Snackbar} from "@varlet/ui";


const defaultAvatarImageUrl = new URL('/public/island.jpg', import.meta.url).href

const lessonsListStore = useLessonsListStore()

const date = ref(new Date().toDateString())

const floating = ref(false)

const initLessonData = {
  id:'',
  title:'',
  provenance:'',
  author: {
    name:'',
  },
  article:'',
  comment_count:null,
  favourite_count:null,
  commentsList:[],
  randomCommentList:[],
}

const state = reactive({
  lessonData: initLessonData,
  loading: true,
  bottomShow:false,
  commentShow:false,
  commentItem:null,
  sortBy:'time'
})

onMounted(() => {
  // 加载当天日期的文章
  handleData(Date.now().toString().substring(0,10))
})

const handleData = (date) => {
  getLessonsList(date, (data) => {
    lessonsListStore.lessonsList = data
    const nowDate = formatDate(new Date(date * 1000));
    const findItem = lessonsListStore.lessonsList.find(item => {
      return item.date_by_day.toString() === nowDate.toString()
    })
    if (findItem == null) {
      handleData(date - 7 * 24 * 60 * 60)
      return
    }
    state.lessonData = findItem
    getActivityStats(findItem.id, (data) => {
      state.lessonData.comment_count = data.comment_count
      state.lessonData.favourite_count = data.favourite_count
      state.loading = false
    })
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
    getActivityStats(findItem.id, (data) => {
      state.lessonData.comment_count = data.comment_count
      state.lessonData.favourite_count = data.favourite_count
      state.loading = false
    })
    return
  }
  handleData(Date.parse(selectDate).toString().substring(0,10))
}
const showFloating = () => {
  if (floating.value ) return
  if (state.lessonData.id === '') return;
  floating.value = true;
  getActivityStats(state.lessonData.id, (data) => {
    state.lessonData.comment_count = data.comment_count
    state.lessonData.favourite_count = data.favourite_count
  })
  getLessonComments(state.lessonData.id, 0, state.lessonData.comment_count, (data) => {
    state.lessonData.commentsList = data
    state.randomCommentList = randomArray(state.lessonData.commentsList, 2);
  })
}
const handleCommentClick = () => {
  state.bottomShow = true
}

const handleCommentCommentClick = (item) => {
  state.commentShow = true
  state.commentItem = item
  getCommentComments(item.id, (response) => {
    state.commentItem.reply = response
  })
}
const handleSortComment = () => {
  if (state.sortBy === 'time') {
    state.sortBy = 'hot'
    state.lessonData.commentsList = state.lessonData.commentsList.sort((item1,item2) => {
      return (item2.like_count + item2.sub_comment_count) - (item1.like_count + item1.sub_comment_count)
    })
  }else {
    state.sortBy = 'time'
    state.lessonData.commentsList = state.lessonData.commentsList.sort((item1,item2) => {
      return (item2.created_at) - (item1.created_at)
    })
  }
}
</script>

<template>
  <var-space direction="column" justify="center">
    <var-row>
      <var-col>
        <var-date-picker hint="" @change="dateChangeHandler" elevation="1" :max="new Date().toDateString()" v-model="date" >
          <template #date="date">
            <div class="date-picker-date">
              {{ date.month}}-{{ date.date}}<var-chip v-show="!state.loading" type="success">{{ state.lessonData.title }}</var-chip>
            </div>
          </template>
        </var-date-picker>
      </var-col>
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
          <template #extra>
            <div class="floating-comment-extra">
              <var-chip plain size="small">{{ state.lessonData.favourite_count }} 喜欢</var-chip>
              <var-chip plain size="small">{{ state.lessonData.comment_count }} 想法</var-chip>
            </div>
          </template>
          <template #floating-content>
            <div class="floating-content-main">
              <var-divider dashed />
              <div class="floating-content" v-for="(item, index) in state.lessonData.article.split('\n')" :id="index" v-html="item === '' ? '<br>' : item"/>
              <var-divider dashed />
              <var-space style="padding: 12px" direction="column" size="large">
                <var-card :elevation="false" v-for="(item) in state.randomCommentList" :id="item.id">
                  <template #title>
                    <div class="comment-user-info">
                      <var-avatar size="small" lazy :src="item.user.avatar === '' ? defaultAvatarImageUrl : item.user.avatar" :error="defaultAvatarImageUrl" />
                      <div class="comment-user-info-name" v-html="item.user.nickname"/>
                    </div>
                  </template>
                  <template #description>
                    <div class="floating-comment">
                      <var-ellipsis :tooltip="false" :line-clamp="3" expand-trigger="click" >
                        <div v-html="item.content.replaceAll('\n','<br>')"></div>
                      </var-ellipsis>
                    </div>
                  </template>
                  <template #extra>
                    <div class="floating-comment-extra">
                      <var-chip size="mini" plain type="info">{{ getDateDiff(new Date(item.created_at * 1000)) }}</var-chip>
                      <var-button text round>
                        <var-icon size="small" name="star" /> {{item.like_count}}
                      </var-button>
                      <var-button round text @click="handleCommentCommentClick(item)">
                        <var-icon size="small" name="chat-processing" /> {{item.sub_comment_count}}
                      </var-button>
                    </div>
                  </template>
                </var-card>
                <var-button @click="handleCommentClick" type="info" text>全部 {{ state.lessonData.comment_count }} 条想法</var-button>
              </var-space>
            </div>
          </template>
          <template #close-button>
            <var-space>
              <var-button size="large" @click.stop="Snackbar.info('功能还在建设中。。')" round><var-icon color="red" name="heart-outline" /></var-button>
              <var-button @click.stop="floating = false" type="danger" size="large" round><var-icon name="window-close" /></var-button>
            </var-space>
          </template>
        </var-card>
      </var-col>
    </var-row>
  </var-space>
  <var-popup style="height: 100%;background: linear-gradient(50deg, rgb(213, 240, 235), rgb(196, 216, 237))" position="bottom" safe-area safe-area-top v-model:show="state.bottomShow">
    <div class="comment-list-main-top">
      <var-button
          @click="state.bottomShow = false"
          round
          text >
        <var-icon name="chevron-left" :size="24" />
      </var-button>
      <var-chip type="success" >
        {{state.lessonData.title}}
      </var-chip>
      <var-button
          @click="handleSortComment"
          round
          text >
        <var-icon name="format-list-checkbox" :size="24" />{{state.sortBy === 'time' ? '时间' : '热度'}}
      </var-button>
    </div>
    <var-space class="comment-list-main-space" direction="column">
      <var-card :elevation="4" v-for="(item) in state.lessonData.commentsList" :id="item.id" >
        <template #title>
          <div class="comment-user-info">
            <var-avatar size="small" lazy :src="item.user.avatar === '' ? defaultAvatarImageUrl : item.user.avatar" :error="defaultAvatarImageUrl" />
            <div class="comment-user-info-name" v-html="item.user.nickname"/>
          </div>
        </template>
        <template #description>
          <div class="floating-comment">
            <var-ellipsis :tooltip="false" :line-clamp="3" expand-trigger="click" >
              <div v-html="item.content.replaceAll('\n','<br>')"></div>
            </var-ellipsis>
          </div>
        </template>
        <template #extra>
          <div class="floating-comment-extra">
            <var-chip size="mini" plain type="info">{{ getDateDiff(new Date(item.created_at * 1000)) }}</var-chip>
            <var-button text round>
              <var-icon @click.stop="Snackbar.info('功能还在建设中。。')" size="small" name="star" /> {{item.like_count}}
            </var-button>
            <var-button round text @click="handleCommentCommentClick(item)">
              <var-icon size="small" name="chat-processing" /> {{item.sub_comment_count}}
            </var-button>
          </div>
        </template>
      </var-card>
    </var-space>
  </var-popup>

  <var-popup style="height: 75vh" position="bottom" safe-area safe-area-top v-model:show="state.commentShow">
    <div class="comment-user-info">
      <var-avatar size="small" lazy :src="state.commentItem.user.avatar === '' ? defaultAvatarImageUrl : state.commentItem.user.avatar" :error="defaultAvatarImageUrl" />
      <div class="comment-user-info-name" v-html="state.commentItem.user.nickname"/>
    </div>
    <div class="floating-comment">
      <div v-html="state.commentItem.content.replaceAll('\n','<br>')"></div>
    </div>
    <div class="comment-comment-reply-message">
      <var-chip size="mini">{{ state.commentItem.sub_comment_count }} 评论</var-chip>
      <var-chip size="mini" plain type="info">{{ getDateDiff(new Date(state.commentItem.created_at * 1000)) }}</var-chip>
    </div>

    <div class="comment-comment-main" v-for="item in state.commentItem.reply">
      <var-avatar size="mini" lazy :src="item.user.avatar === '' ? defaultAvatarImageUrl : item.user.avatar" :error="defaultAvatarImageUrl" />
      <var-paper class="comment-comment-content">
        <div class="comment-comment-username" v-html="item.reply_to.id === '' ? item.user.nickname : `${item.user.nickname} 回复 <b>${item.reply_to.user_nickname}</b> ：`"/>
        <div class="comment-comment-reply" v-html="item.content"/>
        <div class="comment-comment-reply-time">
          <var-chip size="mini" plain type="info">{{ getDateDiff(new Date(item.created_at * 1000)) }}</var-chip>
        </div>
      </var-paper>
    </div>
  </var-popup>
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
.floating-content-main {
  padding-bottom: 60px;
}
.date-picker-date {
  display: flex;
  align-items: center;
  gap: 4vh;
}






.comment-user-info-name span {
  font-size: var(--card-title-font-size);
  color: var(--card-title-color);
  word-break: break-word;
  transition: padding .25s, margin .25s, font-size .25s;
}

.floating-comment-extra {
  color: var(--card-title-color);
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
}

.comment-list-main-space {
  padding-top: 32px;
  margin: 12px;
}
.comment-list-main-top {
  z-index: 99;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  height: 42px;
  padding: 0 12px;
}
</style>