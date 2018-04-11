const Koa = require('koa');
const router = require('koa-simple-router');
const convert = require('koa-convert');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const axios = require('axios');
const qs = require('qs');
const koaBody = require('koa-body');


const app = new Koa();
app.use(koaBody());

// const api = require('./controllers/getBookController');

// const http = ' http://localhost:8888/books/action.php?a=';
const http = ' http://39.105.6.124:80/books/action-book.php?a=';


app.context.render = co.wrap(render({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false
}));

//路由设置
app.use(router(_ => {

    _.get('/', (ctx, next) => {
        ctx.body = {
            data: 1122
        };
    });

    _.get('/index', async (ctx, next) => {
        ctx.body = await ctx.render('index');
    });
    _.get('/list', async (ctx, next) => {
        ctx.body = await ctx.render('list');
    });
    _.get('/add', async (ctx, next) => {
        ctx.body = await ctx.render('add');
    });
    _.get('/edit', async (ctx, next) => {
        ctx.body = await ctx.render('edit');
    });
    _.get('/demo', async (ctx, next) => {
        ctx.body = await ctx.render('demo');
    });

    //获取列表
    _.get('/set-books', async (ctx, next) => {
        let {data} = await axios.get(`${http}set`);
        ctx.body = data;
    });

    /* _.post('/add/', async (ctx, next) => {

         console.log(ctx.request.body);
         let par = {
             title: ctx.request.body.title,
             describe:ctx.request.body.describe,
             content: ctx.request.body.content,
             id:ctx.request.body.id
         };
         let {data} = await axios.post(`${http}/edit-book`, qs.stringify(par));
         ctx.body = data;

     });*/

    //删除某一条数据
    _.get('/del', async (ctx, next) => {
        let str = ctx.request.url.split('=');
        let par = {
            id: str[1]
        };

        let {data} = await axios.get(`${http}del`, {params: par});
        ctx.body = data;

    });

    //添加一条数据
    _.post('/add-book/', async (ctx, next) => {
        console.log(ctx.request.body);
        let par = {
            name: ctx.request.body.name,
            sex: ctx.request.body.sex,
            age: ctx.request.body.age
        };
        let {data} = await axios.post(`${http}add`, qs.stringify(par));
        ctx.body = data;
    });

    //修改一条数据
    _.post('/update-book/', async (ctx, next) => {
        console.log(ctx.request.body);
        let par = {
            name: ctx.request.body.name,
            sex: ctx.request.body.sex,
            age: ctx.request.body.age,
            id: ctx.request.body.id
        };
        let {data} = await axios.post(`${http}update`, qs.stringify(par));
        ctx.body = data;
    });

    //获取某一条数据
    _.get('/get-data', async (ctx, next) => {
        let str = ctx.request.url.split('=');
        let par = {
            id: str[1]
        };

        let {data} = await axios.get(`${http}getone`, {params: par});
        ctx.body = data;

    });

}));

//静态资源文件
app.use(convert(serve(path.join(__dirname, './public'))));

app.listen(8082, () => {
    console.log('server strated');
});