//--------------------async/await 简明教程---https://www.bilibili.com/video/av67223566/-------------------
//Use version 2.
//npm install node-fetch@2
//node-fetch from v3 is an ESM-only module - you are not able to import it with require().
const fetch = require('node-fetch');
const bluebird = require('bluebird');

async function getZhihuColumn(id) {
    await bluebird.delay(1000);
    const url = `https://www.zhihu.com/api/v4/columns/${id}/items`;
    const response = await fetch(url);
    return await response.json();
}
//并行
const showColumnInfo1 = async () => {
    console.time('showColumnInfo');
    const names = ['BurningHealth', 'SJYX666', 'investmentclub', 'cc2cc', 'BGCRZ', 'excel', 'ibagpa', 'c_201557035', 'smetalk', 'c_187975189', 'c_178414660'];
    const promises = names.map(x => getZhihuColumn(x));
    for (const promise of promises) {
        const column = await promise;
        console.log(`Next: ${column.paging.next}`);
    }
    console.timeEnd('showColumnInfo');
}

//串行
const showColumnInfo2 = async () => {
    console.time('showColumnInfo');
    const names = ['BurningHealth', 'SJYX666', 'investmentclub', 'cc2cc', 'BGCRZ', 'excel', 'ibagpa', 'c_201557035', 'smetalk', 'c_187975189', 'c_178414660'];
    for (const name of names) {
        const column = await getZhihuColumn(name);
        console.log(`Next: ${column.paging.next}`);
    }
    console.timeEnd('showColumnInfo');
}

showColumnInfo1();


