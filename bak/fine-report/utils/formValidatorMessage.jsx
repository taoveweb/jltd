const newMessages = () => {
    return {
        default: '%s 验证失败',
        required: '%s 是必填项',
        enum: '%s 必须是 %s 之一',
        whitespace: '%s 不能为空',
        date: {
            format: '%s 的数据 %s 必须是 %s 格式',
            parse: '%s 无法解析， %s 是无效字段',
            invalid: '%s 的数据 %s 是无效字段',
        },
        types: {
            string: '%s 不是一个 %s',
            method: '%s 不是一个 %s 类型方法',
            array: '%s 不是一个 %s',
            object: '%s 不是一个 %s',
            number: '%s 不是一个 %s',
            date: '%s 不是一个 %s',
            boolean: '%s 不是一个 %s',
            integer: '%s 不是一个 %s',
            float: '%s 不是一个 %s',
            regexp: '%s 不是一个有效的 %s',
            email: '%s 不是一个有效的 %s',
            url: '%s 不是一个有效的 %s',
            hex: '%s 不是一个有效的 %s',
        },
        string: {
            len: '%s 的长度必须是 %s',
            min: '%s 的长度不能少于 %s',
            max: '%s 的长度不能大于 %s',
            range: '%s 的长度必须在 %s 到 %s 的范围内',
        },
        number: {
            len: '%s 的长度必须是 %s',
            min: '%s 的长度不能少于 %s',
            max: '%s 的长度不能大于 %s',
            range: '%s 的长度必须在 %s 到 %s 的范围内',
        },
        array: {
            len: '%s 的数量必须是 %s',
            min: '%s 的数量不能少于 %s',
            max: '%s 的数量不能大约 %s',
            range: '%s 的数量必须在 %s 到 %s 的范围内',
        },
        pattern: {
            mismatch: '%s 的值 %s 不匹配 %s',
        },
        clone() {
            const cloned = JSON.parse(JSON.stringify(this));
            cloned.clone = this.clone;
            return cloned;
        },
    };
};
const messages = newMessages();
export default {
    newMessages,
    messages,
};
