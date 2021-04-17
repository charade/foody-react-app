import NavBar from '../../utilsComponents/NavBar';
import Footer from '../../utilsComponents/Footer';
import previous from '../../previous.svg'
import React, { Component } from 'react'
import { render } from '@testing-library/react';
import axios from 'axios';




class Bookmarks extends Component {
    
        constructor(props) {
            super(props);
                this.state = {
                    display: "block",
                    addFavorite: [],
                    
                }

        }

// PrevIcon dispappear when scrooling down
isDisplayPrevIcon = (e)=>{    
    const imageContent = document.querySelector(".image-content")
    if(e.target.scrollTop > imageContent.scrollTop + imageContent.clientHeight/2 ){
        this.setState({display: "none"});
        console.log("Work")
    }
    else{
        this.setState({display: "block"});
    }
}

componentDidMount(){
    this.uploadBookmarks();
    // console.log(this.state.addFavorite)
  
}

componentWillUnmount(){
    
}

showDetails = (e) =>{
    const id = e.target.getAttribute('data-id');
    this.props.history.push(`/details/${id}`);
    
}

removeFavorite = (e) =>{
    
    let dataFav = getStorage();    
    const id = e.target.getAttribute('data-id')
    for(let i=0; i<dataFav.length; i++){
        if(Object.values(dataFav[i]).indexOf(id)!== -1){
            dataFav.splice(i, 1);
            // console.log(id);
        }

    }
    dataFav = dataFav.map(element => JSON.stringify(element) + "  ");
    // console.log(dataFav)
    localStorage.setItem('bookmarks', dataFav)

    const addFavorite = getStorage();
    this.setState({addFavorite});
    
}

uploadBookmarks = async () =>{

    const addFavorite = getStorage();
    await this.setState({addFavorite});
    // console.log(this.state.addFavorite)
}


render() {

    console.log(this.state.addFavorite)
    return(
        <div className="bookmark-wrapper">
            <a href="/">
                <img style={{display: this.state.display}}className='prev-icon' src={previous} />
            </a>
            <NavBar backgroundColor="white"/>                  
                <div className="bookmarks-content" onScroll={this.isDisplayPrevIcon}>
                
                    {display (this.state.addFavorite, this.showDetails, this.removeFavorite)}                    
                </div>    
            <Footer/>   
        </div>      
        
    )
}

}

function getStorage(){
    if(localStorage.getItem("bookmarks")!== ""){
        let addFavorite = localStorage.getItem("bookmarks").split("  ,");
        addFavorite = addFavorite.map(el => JSON.parse(el));
        return addFavorite;
    }
    return [];
    
}

function display (arr, showDetails, removeFavorite){
    if (arr.length>0){
        // console.log("coucou")             
        return (arr.map(el => (
        <figure className="image-content">    
            <img class="image" src={el.img} alt=""/>
            <figcaption>
                <h2>{el.name}</h2>
            </figcaption>
            <div className="buttonAddRemove">
                <button data-id={el.id} onClick={showDetails}>Details</button>
                <button data-id={el.id} onClick={removeFavorite}>Delete</button>
            </div>
        </figure>                   
        )))}
        else{
            // console.log("Match")
            return <h3 style={{color:"white", fontSize:"2rem"}}>You don't have any favorites...</h3>
            
        }

}

export default Bookmarks;


