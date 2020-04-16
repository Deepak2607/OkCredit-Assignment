import React, { Component } from 'react';
import axios from 'axios';
import {Card, CardTitle} from 'react-materialize';

class Article extends Component{
    
    constructor(){
        super();     
        this.state={
            article:{},
        }
    }
    
    componentDidMount=()=> {
        
        const section= this.props.match.params.section;
        const req_id= this.props.match.params.id;
        
        axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=DQsGnYHimJjWAWvqW0NAq2FTOQGOP1EJ`).then(response=>{
            
            const articles= response.data.results; 
            let id=0;
            const updatedArticles= articles.map(article=>{
                id++;
                return{
                    ...article,
                    id:id   
                }
            })
            console.log(updatedArticles);
            let article= updatedArticles.filter(element=> {
                return element.id == req_id;
            }) 
            console.log(article);
            this.setState({
                article:article[0]
            })  
            
        })
    }
    
    
    render(){   
        
        let {article}= this.state;
        let media="";
        media = (article.multimedia) && article.multimedia.filter(m=> {
            return (m.format == "superJumbo");
        })
        let image_url = (media!=null && media[0]) ? media[0].url : "";
        
        return (   
            <div className="container">
                <Card title={article.title} header={<CardTitle image={image_url}/>}
                  actions={[
                    <a key="1" href={article.url} target="_blank"><span className="link">Link to Article</span></a>
                  ]} 
                > 
                  <div>
                  <p>{article.abstract}</p>
                  <p><span className="heading">Author: </span>{article.byline!="" ? article.byline : "Author name unavailable"}</p>
                  <p><span className="heading">Published Date: </span>{article.published_date}</p>
                  </div>
                </Card>
            </div>
       )     
    }

}

export default Article;