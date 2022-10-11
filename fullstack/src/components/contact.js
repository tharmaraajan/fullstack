import React,{useState,useEffect} from 'react';
import ContactForm from "./contactform";
import firebaseDb from '../firebase';  

const Contact=()=>{
    var[contactObjects,setContactObjects]=useState([])
    var[currentId,setCurrentId]=useState('')
    useEffect(()=>{
        firebaseDb.child('contacts').on('value',snapshot=>{
            let contactObjInit=[]
            if(snapshot.val() !=null){
           
                snapshot.forEach(item=>{
                    let userData={}
                    userData.address=item.val().address
                    userData.email=item.val().email
                    userData.fullName=item.val().fullName
                    userData.mobile=item.val().mobile
                    userData.id=item.key
                    contactObjInit.push(userData)
                })
                setContactObjects(contactObjInit)
                console.log(contactObjInit)
            }
            else
                setContactObjects([])
           
        })
    },[])
    const addOrEdit=obj=>{
        if(currentId==='')
            firebaseDb.child('contacts').push(
                obj,
                err=>{
                    if(err)
                        console.log(err)
                }
            )
        else
        firebaseDb.child(`contacts/${currentId}`).set(
            obj,
            err=>{
                if(err)
                    console.log(err)
                else
                    setCurrentId('')
            }   
        )
    
    }
    const onDelete=key=>{
        if(window.confirm('Are you sure to delete this record?')){
            firebaseDb.child(`contacts/`+key).remove(
                err=>{
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }   
            )
        }
    }

    return(
        <>
            <div className='jumbotron jumbotron-fluid'>
                <div className='container'>
                <h1 className='display-4 text-center'>Contact Register</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-5'>
                    <ContactForm {...({addOrEdit, currentId,contactObjects})}/>
                </div>
                <div className='col-md-7'>
                  <table className='table table-borderless table-stripped'>
                      <thead className='thead-light'>
                          <tr>
                              <th>Full Name</th>
                              <th>Mobile</th>
                              <th>Email</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                              Object.keys(contactObjects).map(id=>{
                                  return <tr key={id}>
                                      <td>{contactObjects[id].fullName}</td>
                                      <td>{contactObjects[id].mobile}</td>
                                      <td>{contactObjects[id].email}</td>
                                      <td>
                                          <a className='btn text-primary' onClick={()=>{setCurrentId(id)}}>
                                              <i className='fas fa-pencil-alt'></i>
                                          </a>
                                          <a className='btn text-danger' onClick={()=>{onDelete(contactObjects[id].id)}}>
                                              <i className='fas fa-trash-alt'></i>
                                          </a>
                                      </td>
                                  </tr>
                              })
                          }
                      </tbody>
                  </table>
                </div>
            </div>
        </>
    );
}
export default Contact;