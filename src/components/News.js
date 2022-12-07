import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string

    }
    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
    constructor(props){
        super(props);

        this.state = {
            articles:[],
            loading: true,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
    }
   async componentDidMount(){
      this.props.setProState(0);
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=1&PageSize=${this.props.pageSize}`
      this.setState({loading:true});
      this.props.setProState(30);

      let data= await fetch(url);
      let parsedData= await data.json();
      this.setState({
        articles:parsedData.articles,
        totalResults:parsedData.totalResults
        });
    
      this.setState({
        loading:false
    });
      this.props.setProState(100);


       }

    //    handlePrevClick= async()=>{
    //     if(this.state.page<=1){

    //     }else{
       
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page-1}&PageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data= await fetch(url);
    //     let parsedData= await data.json();
    //     this.setState({articles:parsedData.articles});
    //     this.setState({
    //         page:this.state.page-1,
    //         loading:false
    //     });
    //     }
       

    //    }
    //    handleNextClick= async()=>{
        
    //         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page+1}&PageSize=${this.props.pageSize}`;
    //         this.setState({loading:true});
    //         let data= await fetch(url);
    //         let parsedData= await data.json();
    //         this.setState({articles:parsedData.articles});
    //         this.setState({
    //             page:this.state.page+1,
    //             loading:false
    //         });
        
           
        

    //    }

       fetchMoreData=async()=>{

          
        this.setState({page:this.state.page+1});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fc68d4b53eb4bdca86447df88a0e505&page=${this.state.page}&PageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json();
        
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        });
        

       }

    render() {
        return (
          <>
                <h1 className='text-center'>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={this.state.loading && <Spinner/>}
        >       <div className="container">
                <div className="row"> 
                
               {this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                    <NewsItem title={(element.title).split("-",1)} description={element.description} imageUrl={element.urlToImage?element.urlToImage:"https://via.placeholder.com/300.png/09f/fff%20C/O%20https://placeholder.com/"} newsUrl={element.url}  author={element.author} date={element.publishedAt} countryCode={`en-${this.props.country}`} mediaName={element.source.name}/>
                </div>
                })}
                   
                </div> 
                </div>
                </InfiniteScroll>
            

                
            </>
        )
    }
}

export default News
