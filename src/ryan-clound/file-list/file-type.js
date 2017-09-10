import _ from 'underscore'

function has(arr, value) {
    return !!arr.indexOf(value)>-1
}

export default function fileType(ext,isolder) {
    console.log(ext,isolder)
    if(isolder){
        return 'folder'
    }

    const code = [
        '.js','.css','.less','.scss','.html',
        '.sh',
        '.py'
    ]

    const img = [
        '.jpg','png','gif'
    ]

    const unknown = 'frown-o'
    if(isolder){
        return 'folder'
    }

    if(has(code,ext)){
        return 'code'
    }
    if(has(img,ext)){
        return 'image'
    }
    return unknown
}