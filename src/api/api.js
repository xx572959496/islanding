import axios from "axios";


export const getLessonsList = (timestamp, success ) => {
    // https://api.islanding.club/v1/lessons?updated_at=1713628800
    axios.get(`/api/lessons?updated_at=${timestamp}`).then(res => {
        if (res.status === 200) {
            success(res.data)
        }
    })
}


export const getActivityStats = ( lessons_id, success ) => {
    axios.get(`/api/lessons/${lessons_id}/activity_stats`).then(res => {
        if (res.status === 200) {
            success(res.data)
        }
    })
}

export const getLessonComments = (lessons_id, offset = 0, limit = 256, success) => {
    axios.get(`/api/lessons/${lessons_id}/comments?offset=${offset}&limit=${limit}`).then(res => {
        if (res.status === 200) {
            success(res.data)
        }
    })
}

export const getCommentComments = (comment_id, success) => {
    axios.get(`/api/comments/${comment_id}/comments`).then(res => {
        if (res.status === 200) {
            success(res.data)
        }
    })
}