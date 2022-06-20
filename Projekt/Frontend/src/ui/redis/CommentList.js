import { useEffect,useState } from "react";
import { connect } from "react-redux";
import { getCommentList,editComment,deleteComment,createComment } from "../../ducks/comments/operations";
import { getComments } from "../../ducks/comments/selectors";
import { v4 as uuid } from "uuid";

const CommentList = ({history, comments, getCommentList, editComment,deleteComment,createComment } ,props) => {
    useEffect((comments) => {
        if(comments===[]||comments===undefined||comments.length===0)
        {
            getCommentList();// if there was no voice Actors in redux store
        }
        
    // dependency array needs to be empty, otherwise it will cause ddos attack
    }, [getCommentList]);
    const [content, setContent] = useState("");
    return (
        <div>
            <div>
            <form onSubmit={()=>{createComment({"key":comments.length,"value":content});history.push('/redis')}}>
              <label>Enter Content Of New Comment:
                <input 
                  type="text" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>
              <input type="submit" />
            </form>
            </div>
            <h3>Comments list</h3>
            {
                comments!==undefined&&
                comments.map((comment,index) => {
                    return (
                    <div key={uuid()} className="commentDiv">
                        {comment.key!==undefined&&<div>Key of Comment: {comment.key}</div>}
                        {comment.value!==undefined&&<div>Value of Comment: {comment.value}</div>}
                        {comment!==undefined&&<div>Comment({comment[0]}): {comment[1]}</div>}
                        <div>
                            <button className="MenuButton" onClick={()=>{deleteComment(comment[0]);window.location.reload(false);}}>Delete This Comment</button>
                        </div>
                    </div>)
                    })
            }
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        comments: getComments(state)
    };
}
const mapDispatchToProps = {
    getCommentList,
    editComment,
    deleteComment,
    createComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);