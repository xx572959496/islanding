<script setup>

import {onMounted, reactive, toRaw} from "vue";
import {getCommentComments, getLessonsAbstract, getTodayRecommends} from "../api/api.js";
import dayjs from "dayjs";
import {getDateDiff} from "../utils/date.js";

const defaultAvatarImageUrl = new URL('/public/island.jpg', import.meta.url).href

const state = reactive({
  todayCommendsList:[],
  commendIndex:0,
  todayLessonsList:[{
    "id": "5ad36a8d2f301e0038c8a1c3",
    "article": "旅馆里，留宿的美国客人只有两个。他们打房间里出出进进，经过楼梯时，一路上碰到的人他们都不认识。他们的房间就在面海的二楼。房间还面对公园和战争纪念碑。公园里有大棕榈树，绿色的长椅。天气好的时候，常常可以看到一个带着画架的艺术家。艺术家们都喜欢棕榈树那种长势，喜欢面对着公园和海的旅馆的那种鲜艳的色彩。意大利人老远赶来望着战争纪念碑。纪念碑是用青铜铸成的，在雨里闪闪发光。天正在下雨。雨水打棕榈树滴下来。石子路上有一潭潭的积水。海水夹着雨滚滚地冲了过来，又顺着海滩滑回去，再过一会儿，又夹着雨滚滚地冲过来。停在战争纪念碑旁边广场上的汽车都开走了。广场对面，一个侍者站在餐馆门口望着空荡荡的广场。\n\n那个美国太太站在窗边眺望，外边，就在他们的窗子底下，一只猫蜷缩在一张水淋淌滴的绿色桌子下面。那只猫拼命要把身子缩紧，不让雨水滴着。\n\n「我要下去捉那只小猫，」美国太太说。\n\n「我去捉，」她丈夫从床上说。\n\n「不，我去捉。外边那只可怜的小猫想躲在桌子底下，不让淋湿。」\n\n做丈夫的继续在看书，他枕着垫得高高的两只枕头，躺在床脚那儿。\n\n「别淋湿了，」他说。\n\n太太下楼去，她走出办公室时，旅馆主人站起来，向她哈哈腰。主人的写字台就在办公室那一头。他是个老头，个子很高。\n\n「下雨啦，」太太说。她喜欢这个旅馆老板。\n\n「是，是，太太，坏天气。天气很不好。」\n\n他站在昏暗的房间那一头的写字台后面。这个太太喜欢他。她喜欢他听到任何怨言时那种非常认真的态度。她喜欢他那庄严的态度。她喜欢他愿意为她效劳的态度。她喜欢他那觉得自己是个旅馆老板的态度。她喜欢他那张上了年纪而迟钝的脸和那一双大手。\n\n她一面觉得喜欢他，一面打开了门，向外张望。雨下得更大了。有个披着橡皮披肩的人正穿过空荡荡的广场，向餐馆走去。那只猫大概就在这附近右边。也许她可以沿着屋檐底下走去。正当她站在门口时，在她背后有一顶伞张开来。原来是那个照料他们房间的侍女。\n\n「一定不能让你淋湿，」她面呈笑容，操意大利语说。自然是那个旅馆老板差她来的。\n\n她由侍女撑着伞遮住她，沿着石子路走到他们的窗底下。桌子就在那儿，在雨里给淋成鲜绿色，可是，那只猫不见了。她突然感到大失所望。那个侍女抬头望着她。\n\n「您丢了什么东西啦，太太？」\n\n「有一只猫，」年轻的美国太太说。\n\n「猫？」\n\n「是，猫。」\n\n「猫？」侍女哈哈一笑。「在雨里的一只猫？」\n\n「是呀，」她说，「在这桌子底下。」接着，「啊，我多么想要它。我要那只小猫。」\n\n她说英语的时候，侍女的脸顿时绷紧起来。\n\n「来，太太，」她说，「我们必须回到里面去，你要淋湿了。」\n\n「我想是这样，」年轻的美国太太说。\n\n她们沿着石子路走回去，进了门。侍女呆在外面，把伞收拢。美国太太经过办公室时，老板在写字台那边向她哈哈腰。太太心里感到有点儿无聊和尴尬。这个老板使她觉得自己十分无聊，同时又确实很了不起。她刹那间觉得自己极其了不起。她登上楼梯。她打开房门。乔治在床上看书。\n\n「猫捉到啦？」他放下书本，问道。\n\n「跑啦。」\n\n「会跑到哪里去，」他说，不看书了，好休息一下眼睛。\n\n她在床上坐下。\n\n「我太想要那只猫了，」她说。「我不知道我干吗那么要那只猫。我要那只可怜的小猫。做一只呆在雨里的可怜的小猫，可不是什么有趣的事儿。」\n\n乔治又在看书了。\n\n她走过去，坐在梳妆台镜子前，拿着手镜照照自己。她端详一下自己的侧影，先看看这一边，又看看另一边。接着，她又端详一下后脑勺和脖子。\n\n「要是我把头发留起来，你不认为这是个好主意吗？」她问道，又看看自己的侧影。\n\n乔治抬起头来，看她的颈窝，象个男孩子那样，头发剪得很短。\n\n「我喜欢这样子。」\n\n「我可对它很厌腻了，」她说。「样子象个男孩子，叫我很厌腻了。」\n\n乔治在床上换个姿势。打从她开始说话到如今，他眼睛一直没有离开过她。\n\n「你真漂亮极了，」他说。\n\n她把镜子放在梳妆台上，走到窗边，向外张望。天逐渐见黑了。\n\n「我要把我的头发往后扎得又紧又光滑，在后脑勺扎个大结儿，可以让我摸摸，」她说。「我真要有一只小猫来坐在我膝头上，我一抚摩它，它就呜呜叫起来。」\n\n「是吗？」乔治在床上说。\n\n「我还要用自己的银器来吃饭，我要点上蜡烛。我还要现在是春天，我要对着镜子梳头，我要一只小猫，我要几件新衣服。」\n\n「啊，住口，找点东西来看看吧，」乔治说。他又在看书了。\n\n他妻子往窗外望。这会儿，天很黑了，雨仍在打着棕榈树。\n\n「总之，我要一只猫，」她说，「我要一只猫，我现在要一只猫。要是我不能有长头发，也不能有任何有趣的东西，我总可以有只猫吧。」\n\n乔治不在听她说话。他在看书。他妻子望着窗外，广场上已经上灯了。\n\n有人在敲门。\n\n「请进，」乔治说。他从书本上抬起眼来。\n\n那个侍女站在门口，她紧抱着一只大玳瑁猫，卜笃放了下来。\n\n「对不起，」她说，「老板要我把这只猫送来给太太。」",
    "title": "宜重视自己",
    "provenance": "雨中的猫",
    "date_by_day": 20180416,
    "author": {
      "id": "5b0f6cdcfc82010006a7b13d",
      "name": "海明威"
    },
    "updated_at": 1524049526,
    "created_at": 1523804813
  }],
  commentShow: false,
  articleShow: false,
  cardLoading: true,
  paperLoading: true,

})

onMounted(() => {
  if (state.todayCommendsList.length === 0){
    getTodayRecommends((response) => {
      state.commendIndex = Math.floor(Math.random() * (response.comments.length + 1))
      state.todayCommendsList = response.comments
      state.todayLessonsList = response.lessons
      state.cardLoading  = false
      const commendsListElement = state.todayCommendsList[state.commendIndex];
      commendsListElement.isShow = true;
      getLessonsAbstract(commendsListElement.lesson_id , (response) => {
        state.paperLoading = false
        commendsListElement.lesson = response
        const date = dayjs(response.date_by_day.toString(), "YYYYMMDD");
        commendsListElement.lesson.month = date.format('MMMM')
        commendsListElement.lesson.months = date.format('M')
        commendsListElement.lesson.day = date.format('D')
      })
    })
  }

})

const handleCardClick = () => {
  const todayCommendsListElement = state.todayCommendsList[state.commendIndex];
  getCommentComments(todayCommendsListElement.id, (response) => {
    todayCommendsListElement.reply = response
    state.commentShow = true
  })
}

const handleRefresh = () => {
  state.cardLoading  = true
  state.paperLoading = true
  state.todayCommendsList.splice(state.commendIndex, 1);
  if (state.todayCommendsList.length === 0) {
    getTodayRecommends((response) => {
      state.commendIndex = Math.floor(Math.random() * (response.comments.length + 1))
      state.todayCommendsList = response.comments
      state.todayLessonsList = response.lessons
      state.cardLoading  = false
      const commendsListElement = state.todayCommendsList[state.commendIndex];
      commendsListElement.isShow = true;
      getLessonsAbstract(commendsListElement.lesson_id , (response) => {
        commendsListElement.lesson = response
        const date = dayjs(response.date_by_day.toString(), "YYYYMMDD");
        commendsListElement.lesson.month = date.format('MMMM')
        commendsListElement.lesson.months = date.format('M')
        commendsListElement.lesson.day = date.format('D')
        state.paperLoading = false
      })
    })
  }else {
    // state.todayCommendsList.splice(state.commendIndex, 1);
    state.commendIndex = Math.floor(Math.random() * (state.todayCommendsList.length))
    state.cardLoading  = false
    const commendsListElement = state.todayCommendsList[state.commendIndex];
    getLessonsAbstract(commendsListElement.lesson_id , (response) => {
      commendsListElement.lesson = response
      const date = dayjs(response.date_by_day.toString(), "YYYYMMDD");
      commendsListElement.lesson.month = date.format('MMMM')
      commendsListElement.lesson.months = date.format('M')
      commendsListElement.lesson.day = date.format('D')
      state.paperLoading = false
    })
  }
}

const stringTo = (n) => {
  let str = '';
  if (n == null || n.length === 0) {
    return
  }
  for (let i=0; i < n.length; i++){
    str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i));  //遍历转化为大写的数字
  }
  return str
}

const handlePaperClick = () => {
  state.articleShow = true

}
const handleArticleOpen = () => {
  const id = setInterval(() => {
    let scrollTop = document.querySelector('.floating-popup-content').scrollTop;
    if (scrollTop > 0) {
      document.querySelector('.floating-popup-content').scrollTop = document.querySelector('.floating-popup-content').scrollTop - 30
    }else  {
      clearInterval(id)
    }
  }, 5)
}
</script>

<template>
  <var-loading description="LOADING" :loading="state.cardLoading && state.paperLoading">
  <var-space direction="column" >
    <var-skeleton
        card-height="380"
        title
        avatar
        :rows="14"
        :loading="state.cardLoading"
    >
      <var-card layout="row" style="height: 380px"  v-show="state.todayCommendsList.length > 0" @click="handleCardClick" ripple :elevation="2">
        <template #title>
          <div class="comment-user-info">
            <var-avatar size="small" lazy
                        :src="state.todayCommendsList[state.commendIndex]?.user.avatar === '' ? defaultAvatarImageUrl : state.todayCommendsList[state.commendIndex]?.user.avatar"
                        :error="defaultAvatarImageUrl" />
            <div class="comment-user-info-name" v-html="state.todayCommendsList[state.commendIndex]?.user?.nickname"/>
          </div>
        </template>
        <template #description>
          <div class="recommends-page-comment">
            <var-ellipsis :tooltip="false" :line-clamp="11"  >
              <div v-html="state.todayCommendsList[state.commendIndex]?.content.replaceAll('\n','<br>')"></div>
            </var-ellipsis>
          </div>
        </template>
        <template #extra>
          <var-space size="small" align="center">
            <var-chip size="mini" plain type="info">{{ getDateDiff(new Date(state.todayCommendsList[state.commendIndex]?.created_at * 1000)) }}</var-chip>
            <var-button text round>
              <var-icon size="small" name="star" /> {{state.todayCommendsList[state.commendIndex]?.like_count}}
            </var-button>
            <var-button round text >
              <var-icon size="small" name="chat-processing" /> {{state.todayCommendsList[state.commendIndex]?.sub_comment_count}}
            </var-button>
          </var-space>
        </template>
      </var-card>
    </var-skeleton>
    <var-skeleton
        card-height="185"
        title
        :rows="6"
        :loading="state.paperLoading"
    >
      <var-paper @click="handlePaperClick" ripple :elevation="4">
        <div class="recommends-main-bottom-date" v-show="state.todayCommendsList[state.commendIndex]?.lesson != null">
          <var-paper  class="recommends-main-page-cal">
                    <span class="recommends-main-page-cal-title">
                      <var-chip v-show="!state.loading" type="success">{{ state.todayCommendsList[state.commendIndex]?.lesson?.title }}</var-chip>
                    </span>
            <span class="recommends-main-page-cal-day">
                      {{ state.todayCommendsList[state.commendIndex]?.lesson?.day }}
                    </span>
            <span class="recommends-main-page-cal-month">{{ state.todayCommendsList[state.commendIndex]?.lesson?.month }}</span>
          </var-paper>
          <div>
            <div class="var-card__title">
              {{ state.todayCommendsList[state.commendIndex]?.lesson?.provenance }}
            </div>
            <div class="var-card__subtitle">
              {{state.todayCommendsList[state.commendIndex]?.lesson?.author.name}}
            </div>
            <var-ellipsis  :tooltip="false" :line-clamp="5"  >
              <div class="description" v-html="state.todayCommendsList[state.commendIndex]?.lesson?.article.replaceAll('\n','<br>')"></div>
            </var-ellipsis>
          </div>
        </div>
      </var-paper>
    </var-skeleton>
    <var-divider dashed/>
    <var-space size="large" align="center" justify="center">
      <var-button round type="danger"><var-icon size="32" name="heart-outline" /></var-button>
      <var-button @click="handleRefresh" round type="success"><var-icon size="32" name="refresh" /></var-button>
    </var-space>
  </var-space>
  </var-loading>

  <var-popup style="height: 75vh" position="bottom" safe-area safe-area-top v-model:show="state.commentShow">
    <div class="comment-user-info">
      <var-avatar size="small" lazy :src="state.todayCommendsList[state.commendIndex]?.user.avatar === '' ? defaultAvatarImageUrl : state.todayCommendsList[state.commendIndex]?.user.avatar" :error="defaultAvatarImageUrl" />
      <div class="comment-user-info-name" v-html="state.todayCommendsList[state.commendIndex]?.user.nickname"/>
    </div>
    <div class="floating-comment">
      <div v-html="state.todayCommendsList[state.commendIndex]?.content.replaceAll('\n','<br>')"></div>
    </div>
    <div class="comment-comment-reply-message">
      <var-chip size="mini">{{ state.todayCommendsList[state.commendIndex]?.sub_comment_count }} 评论</var-chip>
      <var-chip size="mini" plain type="info">{{ getDateDiff(new Date(state.todayCommendsList[state.commendIndex]?.created_at * 1000)) }}</var-chip>
    </div>
    <div class="comment-comment-main" v-for="item in state.todayCommendsList[state.commendIndex]?.reply">
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
  <var-popup @opened="handleArticleOpen" class="floating-popup-content" style="padding: 24px;height: 80vh" position="bottom" safe-area safe-area-top v-model:show="state.articleShow">
    <var-space direction="column" justify="end" style="width: 100%;  writing-mode: vertical-lr;    padding: 18px;">
      <var-col style="font-size: var(--card-title-font-size);color: var(--card-title-color);transition: padding 0.25s, margin 0.25s, font-size 0.25s;">
        {{ stringTo(state.todayCommendsList[state.commendIndex]?.lesson?.months) }} 月 {{ stringTo(state.todayCommendsList[state.commendIndex]?.lesson?.day) }} 日
      </var-col>
      <var-col style="font-size: var(--card-title-font-size);color: var(--card-title-color);transition: padding 0.25s, margin 0.25s, font-size 0.25s;    letter-spacing: 10px;">
        {{ state.todayCommendsList[state.commendIndex]?.lesson?.title }}
      </var-col>
    </var-space>

    <var-divider dashed/>
    <div v-for="(item, index) in state.todayCommendsList[state.commendIndex]?.lesson?.article.split('\n')" :id="index" v-html="item === '' ? '<br>' : item"/>

    <var-divider dashed/>
    <div class="var-card__subtitle">
      《{{ state.todayCommendsList[state.commendIndex]?.lesson?.provenance }}》{{state.todayCommendsList[state.commendIndex]?.lesson?.author.name}}
    </div>
  </var-popup>
</template>

<style scoped>
.var-card__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.comment-user-info {
  padding: 12px 12px 0;
  display: flex;
  align-items: center;
  gap: 1vh;
}
.comment-user-info-name {
  color: var(--card-title-color);
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}
.recommends-page-comment {
  padding:12px;
  font-size: 16px;
  color: var(--card-description-color);
  word-break: break-all;
  transition: padding .25s, margin .25s, font-size .25s;
  white-space: break-spaces;
}
.recommends-main-bottom-date {
  display: flex;
}
.recommends-main-page-cal {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0;
  text-align: center;
  line-height: normal;
  flex: none;
}
.recommends-main-page-cal-day {
  font-size: xx-large;    padding: 16px;
  width: 100%;
}
.recommends-main-page-cal-month {
  font-size: 16px;
  padding: 12px;
}
.recommends-main-page-cal-title {
  padding: 12px 8px;
}
.description {
  font-size: var(--card-description-font-size);
  color: var(--card-description-color);
  padding: var(--card-description-padding);
}
</style>