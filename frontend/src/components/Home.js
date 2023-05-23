import * as React from 'react';

export default function Home() {

  return (
    <div className='my-todos'>
      <h5 style={{ marginTop: "20px" }}>Welcome to Todo App - home page in progres ...</h5>

      <div className='technologies'>

        <h5 style={{ marginTop: "20px" }}>Used Technologies:</h5>

        <h6 style={{ marginTop: "20px" }}>Backend:</h6>
        <ul>
          <li>Java</li>
          <li>Spring boot</li>
          <li>Spring security</li>
          <li>Gradle</li>
          <li>JWT</li>
          <li>MySQL</li>
          <li>Hibernate</li>
          <li>JPA</li>
          <li>IntelliJ IDEA</li>
        </ul>

        <h6 style={{ marginTop: "30px" }}>Frontend:</h6>
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Bootstrap</li>
          <li>Visual Studio Code</li>
        </ul>

      </div>

    </div>
  )
}
