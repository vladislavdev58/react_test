import React from 'react'

class Favorites extends React.Component {
    render() {
        const favoriteList = this.props.favorite.favoriteList;
        // console.log(favoriteList);
        return (
            <div>
                {
                    favoriteList.map((item, index) => (
                        <div key={index} className="row mb-3">
                            <div className="col-3">
                                <div className="favorite_img" style={{backgroundImage: `url("${item.img}")`}}></div>
                            </div>
                            <div className="col-7">
                                <a href={item.url} target="_blank" rel="noreferrer"
                                   className="favorite__item_title link-light">{item.title}</a>
                            </div>
                            <div className="col-2">
                                <button value={item.id} onClick={e => {
                                    this.props.removeFavotire(e)
                                }} className="btn btn-danger">&times;</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Favorites;