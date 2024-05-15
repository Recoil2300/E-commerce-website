async function get_jsoninfo(api) {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const results = await response.json();
        return results;
    } catch (error) {
        throw error;  // 继续抛出错误，以便调用者可以处理
    }
}

export{get_jsoninfo};