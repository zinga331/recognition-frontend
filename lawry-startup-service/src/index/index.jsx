import React from 'react';
import '../app.css'; // TODO: local elements

export function Index() {
  const [ quote, setQuote ] = React.useState('');
  const [ recordType, setRecordType ] = React.useState('');
  const [ typeList, setTypeList ] = React.useState([]);

  async function getQuote() {
    let data = await fetch("https://api.quotable.io/random");
    let {content, author} = await data.json();
    return `${content} - ${author}`;
  }

  async function loadTypes() {
    // let data = await fetch("/api/types");
    // data = await ans.json();
    let data = [ // temp mock for offline dev
      {
        id: "french",
        language: "French",
        display: "French 1820 Records",
      },
      {
        id: "french2",
        language: "French",
        display: "1900 Obituary",
      }
    ];
    setTypeList(data);
    if (data?.length) setRecordType(data[0]?.id);
}

  async function getRecord() {
    console.log(recordType);
  }

  React.useEffect(() => {
    if (recordType) getRecord();
  }, [recordType]);

  React.useEffect(() => {
    async function init() {
      loadTypes();
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
        
          <form>
            <select id="datasets" onChange={event => setRecordType(event.target.value)}>
              { typeList.map(t => <option value={t.id}>{ t.display }</option>) }
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
