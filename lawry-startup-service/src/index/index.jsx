import React from 'react';
import '../app.css'; // TODO: local elements

export function Index() {
  const [ quote, setQuote ] = React.useState('');
  const [ recordType, setRecordType ] = React.useState('');
  const [ typeList, setTypeList ] = React.useState([]);
  const [ curRecord, setCurRecord ] = React.useState(null);

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
    // let ans = await fetch(`/api/record?type=${encodeURIComponent(recordType)}`);
    // ans = await ans.json();
    // if (ans.error) {
    //     window.alert("There are no records of that type available!");
    //     return;
    // }
    let ans = {
        type: 'french',
        imageURL: "images/example3.png",
        fields: [
          {
            field: "Person's Name",
            value: "James Smith",
          },
          {
            field: "Record Date",
            value: "02/04/1780",
          },
          {
            field: "Record Location",
            value: "London",
          },
          {
            field: "Mother's Name",
            value: "Elizabeth Johnson",
          },
          {
            field: "Father's Name",
            value: "John Smith",
          },
        ],
    };
    setCurRecord(ans);
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
          {curRecord?.imageURL ? <img src={curRecord.imageURL} className="image" id="recordImage"></img> : <></>}
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
