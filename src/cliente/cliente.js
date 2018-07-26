import React, { Component } from 'react';

class Cliente extends Component {
    constructor() {
      super();
      this.state = {
        title: '',
        description: '',
        tasks: [],
        _id: ''
      };
      this.addTask = this.addTask.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    deleteTask(id) {
      if(confirm('Are you sure you want to delete it??')){
        fetch(`/api/task/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            M.toast({html: 'Task Deleted'});
            this.fetchTask();
          });
      }
    }

    editTask(id){
      fetch(`/api/task/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        })
      });
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
          fetch(`/api/task/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            M.toast({html: 'Task Updated'});
            this.setState({title: '', description: '', _id: ''});
            this.fetchTask();
          });
        } else {
          fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            M.toast({html: 'Task saved'});
            this.setState({title: '', description: ''});
            this.fetchTask();
          })
          .catch(err => console.log(err));
        }
    }

    componentDidMount(){
      this.fetchTask();
    }

    fetchTask() {
      fetch('/api/task')
        .then(res => res.json())
        .then(data => {
          this.setState({tasks: data});
          console.log(this.state.tasks);
        });
    }

    handleChange(event){
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });

    }

    render(){
      return(
          <div>
            {/* NAVIGATION */}
            <nav className="light-blue darken-4">
              <div className="container">
                <div className="nav-wrapper">
                  <a href="#" className="brand-logo">MERN</a>
                </div>
              </div>
            </nav>

            <div className="container">
              <div className="row">
                <div className="col s5">
                  <div className="card">
                    <div className="card-content">
                      <form onSubmit={this.addTask}>
                        <div className="row">
                          <div className="input-field col s12">
                            <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" autoFocus value={this.state.title}/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea name="description" onChange={this.handleChange} cols="30" rows="10" placeholder="Task Description" value={this.state.description} className="materialize-textarea"></textarea>
                          </div>
                        </div>

                        <button type="submit" className="btn light-blue darken-4">
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col s7">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.tasks.map(task => {
                          return (
                            <tr key={task._id}>
                              <td>{task.title}</td>
                              <td>{task.description}</td>
                              <td>
                                <button className="btn light-blue" style={{margin: '4px'}} onClick={() => {this.editTask(task._id)}}>
                                  <i className="material-icons">edit</i>
                                </button>
                                <button className="btn light-blue" style={{margin: '4px'}} onClick={() => {this.deleteTask(task._id)}}>
                                  <i className="material-icons">delete</i>
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
      )
    }
}

export default Cliente;
