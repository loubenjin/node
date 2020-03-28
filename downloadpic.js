const puppeteer = require('puppeteer');
// const https = require('https');
// const axios = require("axios");
const request = require('request');
(async () => {
    const fs = require("fs");
    const rootUrl = 'https://www.guazi.com'
    const workPath = './contents'; if (!fs.existsSync(workPath)) {
        fs.mkdirSync(workPath)
    }
    const browser = await (puppeteer.launch({
        executablePath: 'C:/Users/18047372/AppData/Local/Google/Chrome/Application/chrome.exe', 
        headless: false 
    }));
    const page = await browser.newPage()
    await page.setViewport({ width: 1128, height: 736 });
    // await page.setRequestInterception(true); //拦截器
    // page.on('request', request => { //拦截图片
    //     if (request.resourceType() === 'image') request.abort();
    //     else request.continue();
    // });
    await page.goto("https://www.guazi.com/fuzhou/buy")
    const m_cityList = await page.evaluate(() => { //获取所有城市
        const elements = Array.from(document.querySelectorAll('.all-city dl')) 
        return elements.map(s => {
            let dd = s.getElementsByTagName("dd").item(0)
            let ddList = [];
            for (let i = 0; i < dd.getElementsByTagName("a").length; i++) {
                ddList.push({
                    "cityName": dd.getElementsByTagName("a").item(i).innerHTML, "url": dd.getElementsByTagName("a").item(i).getAttribute("href")
                })
            } return ddList
        })
    })//数组扁平化
    const flattenNew = arr => arr.reduce((prev, next) => Object.prototype.toString.call(next) == '[object Array]' ? prev.concat(flattenNew(next)) : prev.concat(next), [])
    const cityList = flattenNew(m_cityList)
    console.log("城市列表爬取完毕")
    await page.waitFor(2000 + Math.round(Math.random() * 100))
    for (let i = 0; i < cityList.length; i++) {
        await page.waitFor(1000 + Math.round(Math.random() * 100))
        await page.goto(rootUrl + cityList[i].url)
        console.log("跳转到" + cityList[i].cityName)
        console.log("开始爬取" + cityList[i].cityName + "的所有二手车品牌")
        try {
            let brandList = await page.evaluate(() => {  //品牌
                let Array = []
                const dl = document.querySelectorAll('.screen').item(0).getElementsByTagName("dl")
                const div = dl.item(0).getElementsByTagName("dd").item(0).getElementsByTagName("div").item(1)
                const ul = div.getElementsByTagName("ul")
                for (let i = 0; i < ul.length; i++) {
                    let li = ul.item(i).getElementsByTagName("li")
                    for (let j = 0; j < li.length; j++) {
                        let a = li.item(j).getElementsByTagName("p").item(0).getElementsByTagName("a")
                        for (let k = 0; k < a.length; k++) {
                            Array.push({
                                "brand": a.item(k).innerHTML, "url": a.item(k).getAttribute("href")
                            })
                        }
                    }
                } return Array
            })
            console.log(cityList[i].cityName + "的所有二手车品牌爬取完毕")
            for (let j = 0; j < brandList.length; j++) {
                console.log("开始爬取" + cityList[i].cityName + "-" + brandList[j].brand + "的所有车系")
                await page.waitFor(1000 + Math.round(Math.random() * 100))
                await page.goto(rootUrl + brandList[j].url)
                try {
                    const carTypeList = await page.evaluate(() => {  //车型
                        let Array = []
                        const dl = document.querySelectorAll('.screen').item(0).getElementsByTagName("dl")
                        const div = dl.item(1).getElementsByTagName("dd").item(0).getElementsByTagName("div").item(1)
                        const li = div.getElementsByTagName("ul").item(0).getElementsByTagName("li")
                        for (let j = 0; j < li.length; j++) {
                            let a = li.item(j).getElementsByTagName("p").item(0).getElementsByTagName("a")
                            for (let k = 0; k < a.length; k++) {
                                Array.push({
                                    "carType": a.item(k).innerHTML.replace(/s*/g, ""), "url": a.item(k).getAttribute("href")
                                })
                            }
                        } return Array
                    })
                    console.log(cityList[i].cityName + "-" + brandList[j].brand + "的所有车系爬取完毕")
                    for (let k = 0; k < carTypeList.length; k++) {
                        await page.waitFor(1000 + Math.round(Math.random() * 100))
                        console.log("开始爬取" + cityList[i].cityName + "-" + brandList[j].brand + "-" + carTypeList[k].carType + "的所有二手车")
                        let newUrl = rootUrl + carTypeList[k].url
                        pathArray = newUrl.split("/") //拿到第一页url，得到后面的页面的url
                        let urlArray = []
                        try {
                            await page.goto(newUrl)
                            const pageNum = await page.evaluate(() => {   //获取总页数
                                let li = document.querySelectorAll("ul.pageLink").item(0).getElementsByTagName("li")
                                let liNum = li.length
                                return;
                                li.item(li.length - 2).getElementsByTagName("a").item(0).getElementsByTagName("span").item(0).innerHTML
                            })
                            for (let i = 1; i <= pageNum; i++) { //将所有的页面存入数组中
                                urlArray.push(newUrl.replace(new RegExp("/" + pathArray[pathArray.length - 1], 'g'), "/o" + i + "/" + pathArray[pathArray.length - 1]))
                            }
                        } catch (error) {
                            console.log(error);
                            console.log(cityList[i].cityName + "-" + brandList[j].brand + "-" + carTypeList[k].carType + "的所有二手车列表爬取失败,该车型可能只有少量或者没有")
                        } if (urlArray.length != 0) {
                            for (let i = 0; i < urlArray.length; i++) {
                                await page.goto(urlArray[i]);
                                const list = await page.evaluate(() => {
                                    let carArray = []
                                    let li = document.querySelectorAll("ul.carlist").item(0).getElementsByTagName("li")
                                    for (let i = 0; i < li.length; i++) {
                                        a = li.item(i).getElementsByTagName("a").item(0)
                                        carArray.push({
                                            "url": a.getAttribute("href"), "imgUrl": a.getElementsByTagName("img").item(0).getAttribute("src"), "carName": a.getElementsByTagName("h2").item(0).innerHTML, "carData": (a.getElementsByTagName("div").item(0).innerHTML).replace(new RegExp('<span class="icon-pad">', 'g'), "").replace(new RegExp('</span>', 'g'), ""), "price": a.getElementsByTagName("div").item(1).getElementsByTagName("p").item(0).innerHTML.replace(new RegExp('<span>', 'g'), "").replace(new RegExp('</span>', 'g'), "").replace(/s*/g, "")
                                        })
                                    } return carArray
                                })
                                await page.waitFor(500 + Math.round(Math.random() * 100))
                                console.log(list)
                            }
                        } else {
                            try {
                                const list = await page.evaluate(() => {
                                    let carArray = []
                                    let li = document.querySelectorAll("ul.carlist").item(0).getElementsByTagName("li")
                                    console.log("该车型少量")
                                    for (let i = 0; i < li.length; i++) {
                                        a = li.item(i).getElementsByTagName("a").item(0)
                                        carArray.push({
                                            "url": a.getAttribute("href"), "imgUrl": a.getElementsByTagName("img").item(0).getAttribute("src"), "carName": a.getElementsByTagName("h2").item(0).innerHTML, "carData": (a.getElementsByTagName("div").item(0).innerHTML).replace(new RegExp('<span class="icon-pad">', 'g'), "").replace(new RegExp('</span>', 'g'), ""), "price": a.getElementsByTagName("div").item(1).getElementsByTagName("p").item(0).innerHTML.replace(new RegExp('<span>', 'g'), "").replace(new RegExp('</span>', 'g'), "").replace(/s*/g, "")
                                        })
                                    } return carArray
                                })
                                await page.waitFor(500 + Math.round(Math.random() * 100))
                                console.log(list);
                                if(list.length>1){
                                    // fs.appendFile('./contents/' + cityList[i].cityName + '.json',',"' + (brandList[j].brand + "_" + carTypeList[k].carType).trim() + '":' + JSON.stringify(list),  function(err) {

                                    // })
                                    console.log(brandList[i].brand,0000)
                                    list.forEach((element,index )=> {
                                            if (element.imgUrl.indexOf('http') !== -1) {
                                                var writeStream = fs.createWriteStream(`./images/${index}.jpg`,{autoClose:true})

                                                request("http://image.guazistatic.com/gz01200113/15/20/4d3c5b9756898140cf68f0ecd93f67d0.jpg").pipe(writeStream);

                                                writeStream.on('finish',function(){
                                                    console.log('文件写入成功')
                                                })
                                                request(element.imgUrl).pipe(fs.createWriteStream(`./images/${index}.png`)) //这里为了省事，我就直接用下标命名了；
                                            }
                                    });
                                }

                            } catch (error) {
                                console.log("该车型没有")
                            }
                        }
                    }
                } catch (error) {
                    console.log(cityList[i].cityName + "-" + brandList[i].brand + "的所有车系爬取失败")
                }
            }
        } catch (error) {
            console.log(error);
            console.log(cityList[i].cityName + "二手车品牌爬取失败")
        }
        await page.waitFor(1000 + Math.round(Math.random() * 100))
    }
})();