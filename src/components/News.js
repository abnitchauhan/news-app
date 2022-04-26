import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

 
    constructor(){
        super();
        
        console.log('Hello I am a Constructor From News Component')
        this.state = {
            articles: [],
            loading: false,
            page:1
        };
    }


        async componentDidMount()
        {
            let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9e21ee0c35c34e9da248ac72995c3025&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json(); 
            this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false});
        }

        handleNextClick = async () =>{
          if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
          {
          let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9e21ee0c35c34e9da248ac72995c3025&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
          this.setState({loading: true});
          let data = await fetch(url);
          let parsedData = await data.json(); 
          this.setState({page: this.state.page +1,
            articles: parsedData.articles,
            loading: false});
          }
        }

        
        handlePrevClick = async () =>{
          let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=9e21ee0c35c34e9da248ac72995c3025&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parsedData = await data.json(); 
          this.setState({page: this.state.page-1,
            articles: parsedData.articles});
        }

  render() {
         
    return (
      <>
      <div className='container my-5'>
        {this.state.loading && <Spinner />}
          <div className="row">
              {!this.state.loading && this.state.articles.map((element) =>{
                //   console.log(element); 
                return  <div className="col-md-4"  key={element.url} >
                  <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:'https://c.ndtvimg.com/2021-09/0o8jdg68_youtube-generic_625x300_27_September_21.jpg'} newsUrl={element.url}/>
                  </div> 
              })}
             
          </div> 
      </div>
      <div className="container my-3 d-flex justify-content-between">
         <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
         <button type="button"  disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
      </>
    )
  }
}

export default News
