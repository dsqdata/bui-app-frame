export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

export function toBoolean(val) {
    if (val === "") return val
    return val === "true" || val == "1";
}
