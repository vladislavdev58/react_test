import React from 'react';
import Posts from "./components/Posts";
// import Button from "./components/Button";
import Favorites from "./components/Favorites";
import './App.css'


class App extends React.Component {

    // Над версткой не заморачивался вообще, думаю тут это не так важно
    // Все функции можно раскидать на компоненты, причесать код и все такое, но я уже не могу(после работы, делаю это)
    // Знаю, что брать данные с DOM как я делаю в добавлении в избранное не хорошо, но я сделал так
    // Так же нет проверок все что связаное с избранным, кроме на потворное добавление. Лишний символ и... 🔥
    // Код писался без комментариев и все такое, ибо быстрее-быстрее, готов объяснить на созвоне.
    // При проверке учтите что это первый раз когда я делал что-то на рекате. Я ни смотрел ни одного курса(не считая часа, после собеседования)
    // Про хуки узнал 7 числа в 12 ночи. Переделывать уже нет желания.
    // Так же не везде есть картинки. Там где галерея они по другому лежат. Хотел достать хотя-бы одну, но увы.
    // Вообщем не судите строго
    // 💊 - таблеточка успокоительного перед проверкой 😂

    constructor(props) {
        super(props);
        this.state = {
            posts: {
                error: null,
                isLoaded: false,
                items: [],
            },
            favorite:{
                favoriteList: []
            }

        };
        this.limitAPI = 10;
        this.lastPostsName = null;
    }

    loadingAPI = (afterId) => {
        fetch(`https://www.reddit.com/r/cats.json?limit=${this.limitAPI}&after=${afterId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({posts:{
                        isLoaded: true,
                        items: this.state.posts.items.concat(result.data.children)
                    }});

                    this.lastPostsName = this.state.posts.items[this.state.posts.items.length - 1].data.name;
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    endlessScroll = () =>{
        window.addEventListener('scroll', () => {

            var block = document.getElementById('posts');

            var contentHeight = block.offsetHeight;      // 1) высота блока контента вместе с границами
            var yOffset       = window.pageYOffset;      // 2) текущее положение скролбара
            var window_height = window.innerHeight;      // 3) высота внутренней области окна документа
            var y             = yOffset + window_height;

            // если пользователь достиг конца
            if(y >= contentHeight)
            {
                this.loadingAPI(this.lastPostsName);
                //загружаем новое содержимое в элемент
            }
        });

    }

    checkLocalFavorite = () => {
        if (localStorage.getItem('favorites') !== null) {
            var favoriteList = JSON.parse(localStorage.getItem('favorites'));
            this.setState({favorite:{
                    favoriteList:  favoriteList
                }});
        }
    }

    addFavotire = (event) => {
        const id = event.target.value;
        const found = this.state.favorite.favoriteList.some(function (el) {
            return el.id === id;
        });

        if (!found) {
            const url = document.querySelector('[data-id="' + id + '"] a').href;
            const title = document.querySelector('[data-id="' + id + '"] .card-title').textContent;
            var img = 'https://pbs.twimg.com/profile_images/927927700483960832/DFUqo-xB.jpg';
            if (document.querySelector('[data-id="' + id + '"] img')) {
                img = document.querySelector('[data-id="' + id + '"] img').getAttribute('src');
            }
            const arrFavorite = [{id, url, title, img}];

            this.setState({
                favorite: {
                    favoriteList: this.state.favorite.favoriteList.concat(arrFavorite)
                }
            }, () => {
                localStorage.setItem('favorites', JSON.stringify(this.state.favorite.favoriteList));
                alert('Добавлено ✔');
            });
        }
        else{
            alert('Уже есть 😉');
        }
    }

    removeFavotire = (event) => {
        const id = event.target.value;
        this.setState({favorite:{
                favoriteList: this.state.favorite.favoriteList.filter(item => item.id !== id)
            }},() => {
            localStorage.setItem('favorites', JSON.stringify(this.state.favorite.favoriteList));
        });
    }

    componentDidMount() {
        this.loadingAPI(this.lastPostsName);
        this.checkLocalFavorite();
        this.endlessScroll();
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-12 col-md-8" id="posts">
                            <Posts posts={this.state.posts} addFavotire={this.addFavotire} />
                        </div>
                        <div className="col-12 col-md-4 bg-dark">
                            <p className="display-6 text-light">Избранное ❤</p>
                            <Favorites favorite={this.state.favorite} removeFavotire={this.removeFavotire}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
// https://prnt.sc/vyd7gl - тык
export default App;