const list = JSON.parse(decodeURIComponent(tkbList.replace(/&quot;/g, '"')));
list.forEach((item) => {
    $(`tr[data-thu="${item.MA_THU}"]`)
        .children()
        .eq(item.MA_TG)
        .html(`<b> ${item.TEN_LOP} <br> ${item.TEN_PHONG} </br>`);
});
