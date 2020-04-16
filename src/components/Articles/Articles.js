import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Style.css';
import Selection from "./Selection";
import {Card, CardTitle} from 'react-materialize';


//const InitialState = {
//       articles:[],
//       section:"home",
//       render: false
//}

class Articles extends Component{
    
    constructor(){
        super();     
        this.state={
            articles:[],
            section:"home",
            render: false 
        }
  // Retrieve the last state
//  this.state = localStorage.getItem("appState") ? JSON.parse(localStorage.getItem("appState")) : InitialState;
    }
    
    componentDidMount=()=> {
        axios.get(`https://api.nytimes.com/svc/topstories/v2/${this.state.section}.json?api-key=DQsGnYHimJjWAWvqW0NAq2FTOQGOP1EJ`).then(response=>{
            
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
            this.setState({articles:updatedArticles});
        })
        setTimeout(() => { 
            this.setState({render: true})
        }, 1000)
    }
    
    
//    componentWillUnmount() {
//      // Remember state for the next mount
//      localStorage.setItem('appState', JSON.stringify(this.state));
//    }
    
    
    onChange=(event)=> {               
        axios.get(`https://api.nytimes.com/svc/topstories/v2/${event.target.value}.json?api-key=DQsGnYHimJjWAWvqW0NAq2FTOQGOP1EJ`).then(response=>{
            
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
            this.setState({articles:updatedArticles});    
        })
        this.setState({section:event.target.value});
    }
    
    
    render(){
        
            if(this.state.render==false){
              return <h4>loading...</h4>
            }
        
            return(            
               <div> 
               <Selection onChange={this.onChange} value={this.state.value}/>
               <h5 className="heading">{this.state.section} Section Articles</h5>
                
                {this.state.articles.map(article =>{
                        
                        let media="";
                        media = (article.multimedia) && article.multimedia.filter(m=> {
                            return (m.format === "thumbLarge");
                        })
                        let image_url = (media!=null && media[0]) ? media[0].url : "";
                        let link = `/${this.state.section}/${article.id}`;
                        
                        return(
                            <div key={article.id} className="row">
                            <div className="col-md-12" key={article.id}>
                                <Card className="row-wise" title={article.title} header={<CardTitle image={image_url}/>}
                                  actions={[
                                  <Link key={article.id} to={link}><span className="link">Read Article</span></Link>
                                  ]} 
                                  horizontal
                                 >
                                 <p>{article.byline!="" ? article.byline : "Author name unavailable"}</p>
                                 </Card> 
                            </div>
                            </div>
                        )        
                })} 
                </div>
            );
     }    
}

export default Articles;



