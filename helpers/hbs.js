import moment from 'moment';

const formatDate = (date, format) => {
    return moment(date).format(format);
};

// https://www.w3schools.com/jsref/jsref_substr.asp
// https://www.w3schools.com/jsref/jsref_lastindexof.asp
// substr tra ve chuoi moi, khong thay doi chuoi hien tai
const truncate = (str, len) => {
    if (str.length > len && str.length > 0) {
        let newStr = str + ' ';
        newStr = str.substr(0, len);
        newStr = str.substr(0, newStr.lastIndexOf(' '));
        newStr = newStr.length > 0 ? newStr : str.substr(0, len);
        return newStr + ' ...';
    }
    return str;
}

const stripTags = (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '')
}

const editIcon = (storyUser, loggedUser, storyId, floating = true) => {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
        if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
        } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
        }
        } else {
            return '';
    }
}

const select = (selected, options) => {
    return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        );
}
    
export { formatDate, truncate, stripTags, editIcon, select};