import React from 'react'

class Posts extends React.Component {
    render() {
        const {error, isLoaded, items} = this.props.posts;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div className="posts__list">
                    {
                        items.map((item, index) => (
                            !(item.data.thumbnail === "self") ?
                                (
                                    <div key={index} className="card mb-4" data-id={item.data.id}>
                                        <button className="addFavorite" value={item.data.id} onClick={e => {this.props.addFavotire(e)}}>❤</button>
                                        {item.data.hasOwnProperty('gallery_data') ?
                                            (<a href={item.data.url} target="_blank" rel="noreferrer">Ссылочка на галерею</a>)
                                            :
                                            (
                                                <a href={`https://www.reddit.com${item.data.permalink}`} target="_blank" rel="noreferrer">
                                                    <img src={item.data.url} className="card-img-top"/>
                                                </a>
                                            )
                                        }
                                        <div className="card-body">
                                            <a href={`https://www.reddit.com${item.data.permalink}`} className="card-title" target="_blank" rel="noreferrer">{item.data.title}</a>
                                        </div>
                                    </div>
                                ) : null
                        ))
                    }
                </div>
            )
        }
    }
}

export default Posts;