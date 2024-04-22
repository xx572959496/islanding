import {defineStore} from "pinia";
import {computed, ref} from "vue";

// setup() 函数写法
export const useLessonsListStore = defineStore('email', () => {
    const lessonsList = ref([{
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
        date_by_day:''
    }]); // state
    const getterLessons = computed(() => { // getters
        return lessonsList.value;
    })
    const changeLessonsList = (newLessonsList) => { // actions
        lessonsList.value = newLessonsList
    }
    return {lessonsList, getterLessons, changeLessonsList}
})