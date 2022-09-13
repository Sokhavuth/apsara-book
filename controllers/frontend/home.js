// controllers/frontend/home.js

const bookdb = require("../../models/book")


class Home{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Home"
        setup.route = "/"

        const query = {"bookCover?ne": null, "bookCover?ne": ""}
        let { books, length } = await bookdb.getBooks(req, 5, query)
        setup.items = books
        setup.count = length
        const bookObj = await bookdb.getBooks(req, 13)
        setup.articles = bookObj.books
        setup.randomBooks = await bookdb.getRandomBooks(req, setup.fpostLimit, query)
        setup.page = 1

        res.render("base", { data: setup })
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { posts, length } = await postdb.paginate(req, setup.fpostLimit)
        setup.count = length
        setup.items = posts
        setup.page = parseInt(req.body.page) + 1
        res.json(setup)
    }
}


module.exports = new Home()