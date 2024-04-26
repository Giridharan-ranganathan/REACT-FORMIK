import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const App = () => {
  const [allDatas, setAllDatas] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [titel, setTitel] = useState('');
  const [author, setAuthor] = useState('');
  const [bookNumber, setBookNumber] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [id, setId] = useState(undefined);

  const initialValues = {
    titel: '',
    author: '',
    bookNumber: '',
    pubDate: '',
  };


  const onSubmit = async (values) => {
    console.log('hello');
    console.log(values);
    if (id) {
      try {
        await axios.put(`https://662b690bde35f91de15829bb.mockapi.io/form_app/using_formik/todo/${id}`,
          {
            titel: values.titel,
            author: values.author,
            bookNumber: values.bookNumber,
            pubDate: values.pubDate,
          }
        );
        setIsRefresh(!isRefresh);
        clearForm();
      } catch (error) {
        console.error('Error editing todo:', error);
      }
    } else {
      try {
        await axios.post(`https://662b690bde35f91de15829bb.mockapi.io/form_app/using_formik/todo`,
          {
            titel: values.titel,
            author: values.author,
            bookNumber: values.bookNumber,
            pubDate: values.pubDate,
          }
        );
        setIsRefresh(!isRefresh);
        clearForm();
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    }
  };
  
  
  const validate = (values) => {
    console.log(values);
    const errors = {};
    if (!values.titel) {
      errors.titel = 'Title is required';
    }else{
      setTitel(values.titel)
    }

    if (!values.author) {
      errors.author = 'Author is required';
    }else{
      setAuthor(values.author)
    }

    if (!values.bookNumber) {
      errors.bookNumber = 'ISBN Number is required';
    }else{
      setBookNumber(values.bookNumber)
    }
    if (!values.pubDate) {
      errors.pubDate = 'Publication Date is required';
    }else{
      setPubDate(values.pubDate)
    }
    return errors;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://662b690bde35f91de15829bb.mockapi.io/form_app/using_formik/todo`
        );
        setAllDatas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isRefresh]);


  // const editTodo = async () => {
  //   try {
  //     await axios.put(`https://662b690bde35f91de15829bb.mockapi.io/form_app/using_formik/todo/${id}`,
  //       {
  //         titel: titel,
  //         author: author,
  //         bookNumber: bookNumber,
  //         pubDate: pubDate,
  //       }
  //     );
  //     setIsRefresh(!isRefresh);
  //     clearForm();
  //   } catch (error) {
  //     console.error('Error editing todo:', error);
  //   }
  // };


  // const createTodo = async () => {
  //   try {
  //     await axios.post(`https://66240f2804457d4aaf9b8934.mockapi.io/axios_app/using_axios`,
  //       {
  //         titel: titel,
  //         author: author,
  //         bookNumber: bookNumber,
  //         pubDate: pubDate,
  //       }
  //     );
  //     setIsRefresh(!isRefresh);
  //     clearForm();
  //   } catch (error) {
  //     console.error('Error creating todo:', error);
  //   }
  // };

  const clearForm = () => {
    setTitel('');
    setAuthor('');
    setBookNumber('');
    setPubDate('');
    setId(undefined);
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(
        `https://662b690bde35f91de15829bb.mockapi.io/form_app/using_formik/todo/${id}`
      );
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        <div>
          <div className="page-header">
            <h2 className="page-header-title">Manage Book</h2>
          </div>
          <div className="container mb-3">
            <div className="border-card">
              <Form>
                <div className="form-group">
                  <label htmlFor="title"><b>Title:</b></label>
                  <Field type="text" className="form-control text-muted" id="title" name="titel" placeholder="Enter your Title"  value={titel} />
                  <ErrorMessage className='erroralert' name="titel" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="author"><b>Author:</b></label>
                  <Field  type="text" className="form-control text-muted" id="author" name="author"  placeholder="Enter your Author" value={author} />
                  <ErrorMessage className='erroralert' name="author" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="ISBNNumber"><b>ISBN Number:</b></label>
                  <Field type="text" className="form-control text-muted" id="ISBNNumber" name="bookNumber" placeholder="Enter your ISBN Number" value={bookNumber}  />
                  <ErrorMessage className='erroralert' name="bookNumber" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="publication_date"><b>Publication Date:</b></label>
                  <Field type="text" className="form-control text-muted" id="publication_date" name="pubDate" placeholder="Enter your Publication Date" value={pubDate}  />
                  <ErrorMessage className='erroralert' name="pubDate" component="div" />
                </div>
                <div className="form-group fot">
                  <button type="submit"  className="btn btn-primary" >Submit</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
      <div className="demo">
        {allDatas.map((element) => (
          <div className="card" key={element.id}>
            <div className="card-body">
              <h2 className="product_name">{element.titel}</h2>
              <p className="product_description">{element.author}</p>
              <p className="book-code"> {element.bookNumber}</p>
              <p className="book-date"> {element.pubDate}</p>
            </div>
            <div className="addCartBtn text-center">
              <div className="btnDiv mb-3">
              <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    setId(element.id);
                    setTitel(element.titel);
                    setAuthor(element.author);
                    setBookNumber(element.bookNumber);
                    setPubDate(element.pubDate);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginLeft: 10 }}
                  onClick={() => removeTodo(element.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default App;
