import React from 'react';
import '../app.css'; // TODO: local elements

export function Index() {
  const [ quote, setQuote ] = React.useState('');

  async function getQuote() {
    let data = await fetch("https://api.quotable.io/random");
    let {content, author} = await data.json();
    return `${content} - ${author}`;
  }

  React.useEffect(() => {
    async function init() {
      // console.log('point a');
      // setQuote(await getQuote());
    }
    init();
  }, []);

  return (
    <main>
      <h1 className="welcome">Welcome</h1>

      { quote ? <div className="quote"> { quote } </div> : <></>}

      <div className="content">

        <div className="image-wrapper">
          <img src={"./images/example.png"} className="image" id="recordImage"></img>
        </div>
        
        <div className="form-wrapper">
        
          <form action="javascript:void(0);">
            <select id="datasets">
              <option value="french">French 1820 Birth Records</option>
              <option value="finnish">Finnish 1810 Birth Records</option>
            </select><br/>
            
            <table id="indexFields">
              <tr>
                <td>Person's Name</td>
                <td><input type="text" id="name" placeholder="Jaako Ilkka"/></td>
              </tr>
              <tr>
                <td>Person's Birth Date</td>
                <td><input type="text" id="name" placeholder="December 5, 1810"/></td>
              </tr>
              <tr>
                <td>Person's Birth Place</td>
                <td><input type="text" id="name" placeholder="Hämeenlinna, Finland"/></td>
              </tr>
              <tr>
                <td>Mother's Name</td>
              <td><input type="text" id="name" placeholder="Riika Ilkka"/></td>
              </tr>
              <tr>
                <td>Father's Name</td>
                <td><input type="text" id="name" placeholder="Antti Ilkka"/></td>
              </tr>
            </table>
            
            <div className="button-row">
              <button id="addField">Add field</button>
              <button type="submit" id="submit">Submit</button><br/>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
