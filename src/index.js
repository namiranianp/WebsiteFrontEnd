import React from 'react';
import ReactDOM from 'react-dom';
import { Document } from 'react-pdf';
import './index.css';

class Header extends React.Component {
  render() {
    let myHeight = window.innerHeight * .11;
    return (
      <div className="header" style={{height: myHeight, backgroundColor: this.props.color,}}>
        <h1 style={{
          margin: '0px',
          paddingLeft: '20px',
          paddingTop: (myHeight - 37) / 2,
        }}>
          <a name={this.props.url}>{this.props.title}</a>
        </h1>
      </div>
    );
  }
}

class ShiftingHeader extends React.Component {
  /*
      The allHeaders being passed in will be the list of all the headers. It will be an array of objects in the following format:
      [
        {
          name,
          color,
          relative URL on page,
        },
        {
          name,
          color,
          relative URL on page,
        },
        ...
      ]
    */
  constructor(props) {
    super(props);
    let header = props.allHeaders[props.currHeader];
    this.state= {
      changingState: false,
      currPos: props.currHeader,
      title: header.title,
      color: header.color,
      allHeaders: props.allHeaders,
    };
  }

  doSwipe() {

  }

  setHeader() {

  }

  switchHeader(pos) {
    let nextHeader = this.state.allHeaders[pos];
    this.setState((state, props) => {
      return {
        changingState: false,
        currPos: this.state.currPos,
        title: this.state.title,
        color: this.state.color,
        allHeaders: this.state.allHeaders,
      };
    });

    this.setState((state, props) => {
      return {
        changingState: false,
        currPos: pos,
        title: nextHeader.title,
        color: nextHeader.color,
        allHeaders: this.state.allHeaders,
      };
    });
  }

  render() {
    let myHeight = window.innerHeight * .11;
    let nextHeader = this.state.allHeaders[this.state.currPos + 1];
    return (
      <div className={["header", "shiftingHeader"].join(' ')} style={{height: myHeight, backgroundColor: this.state.color,}}>
        <div class="overlay" style={{backgroundColor: nextHeader.color,}}>
          <h1 style={{
            width: this.state.changingState ? '100%' : '',
            margin: '0px',
            paddingLeft: '20px',
          }}>
            {nextHeader.title}
          </h1>
        </div>

        <div className="notOverlay">
          <Header
            color= {this.state.color}
            title= {this.state.title}
            url= 'shiftingHeader'
          />
        </div>
        <button onClick={() => this.switchHeader(2)}>
          BUTTON
        </button>

      </div>
    );
  }
}

/*
render() {
  let myHeight = window.innerHeight * .11;
  return (
    <div className={["header", "shiftingHeader"].join(' ')} style={{height: myHeight, backgroundColor: this.state.color,}}>
      <h1 style={{
        margin: '0px',
        paddingLeft: '10px',
        paddingTop: (myHeight - 37) / 2,
      }}>
        {this.state.title}
      </h1>
      <div class="overlay">
        <div class="text">{this.state.allHeaders[3].title}</div>
      </div>
    </div>
  );
}
*/

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.allHeaders = [
      {
        title: "Welcome To My Website",
        color: "#b0d7f4",
        url: "welcome",
      },
      {
        title: "Information About Me",
        color: "#96bfdd",
        url: "info",
      },
      {
        title: "My Currently Viewable Projects",
        color: "#75add6",
        url: "projects",
      },
      {
        title: "Works Of Philosophy",
        color: "#2b8ed8",
        url: "philosophy",
      },
    ];
  }

  renderShiftingHeader(args) {
    return (
      <ShiftingHeader
        currHeader= {0}
        allHeaders= {this.allHeaders}
      />
    );
  }

  renderHeader(args) {
    return (
      <Header
        color= {args.color}
        title= {args.title}
        url= {args.url}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderShiftingHeader()}
        <div class="body">
          <div class="section">
            {this.renderHeader(this.allHeaders[0])}

            <div class= "sectionBody" style={{marginLeft: '15px', display: 'inline-block'}}>
              <h2 style={{marginBottom: '5px', marginLeft: '35px',}}>What is all this?</h2>
              <p style={{maxWidth: '1000px', marginBottom: '10px',}}>
                I have been practicing and expanding my web development skills as well as meaning to organize my Github repositories, so
                creating this page was killing two birds with one stone. To navigate around this site, check out the menu button on the left
                side of the screen. Since I do not have access to the repoistories and libraries that make creating the front end easier, this
                site is not reflective of my highest quality product. Regardless of where this stands in the list of my achievements, I am
                proud of what I have made using only HTML and CSS.
              </p>

              <h2 style={{marginBottom: '5px', marginLeft: '35px',}}>Table of Contents:</h2>
              <p style={{marginLeft: '35px', fontSize: '14px', width: '500px',}}>
                Here you will be able to see what sections there are to view and what each section entails. The sections are listed out in the
                order in which they appear on this page. If you wish to jump to a specific section, use the menu tool on the left side of the
                screen.
              </p>
              <table width='500px' class="TOC">
                <tr>
                  <th width='100px' height='60px'><b>Name in menu</b></th>
                  <th><b>What you can find there</b></th>
                </tr>
                <tr style={{backgroundColor: '#b0d7f4',}}>
                  <td style={{height: '65px', textAlign: "center", }}>Welcome</td>
                  <td>A brief description of this webpage and how to navigate it.</td>
                </tr>
                <tr style={{backgroundColor: '#96bfdd',}}>
                  <td style={{textAlign: 'center',}}>About Me</td>
                  <td>Information about who I am, my education, and my technical experience. You may also find my resume here.</td>
                </tr>
                <tr style={{backgroundColor: '#75add6',}}>
                  <td style={{textAlign: 'center',}}>Projects</td>
                  <td>
                    This is where you can find my past and current projects listed out nicely with a description of what they do and how to
                    use them.
                    </td>
                </tr>
                <tr style={{backgroundColor: '#2b8ed8',}}>
                  <td style={{textAlign: 'center',}}>Philosophy</td>
                  <td>Along with computer science, I am passionate for philosophy. Here you can see my philosophical works and musings.</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="section">
            {this.renderHeader(this.allHeaders[1])}

            <div class= "sectionBody" style={{marginLeft: '15px', display: 'inline-block',}} id="myInfo">
              <h2 style={{marginBottom: '5px', marginLeft: '35px',}}>A little about me:</h2>
              <p style={{maxWidth: '1000px', marginBottom: '10px',}}>
                I am a graduate from the University of San Francisco with a Bachelors in Computer Science and a minor in Philosophy. For as
                far back as I can remember, I have always had a thirst for knowledge and a desire to solve challenging problems in a unique
                way. It is these qualities that drew me to the fields of computer science and philosophy. I spend my time outside of work
                learning secure coding methods, network programming, and working on personal projects. I am also exploring and reading about
                the philosophies of thought, consciousness, and emotion. The area of study I am most interested in currently is the
                intersection of my two loves, computer science and philosophy. In my opinion, the most fascinating topic to learn about and
                discuss is whether Artificial intelligence can ever become conscious, and its implications on the origin of rights and
                consciousness in humanss.
              </p>

              <div style={{height: '1290px', width: '100%',}}>
                <div class="resume">
                  <h2 style={{marginBottom: '5px',}}>Current Resume:</h2>
                  <object data="/files/PedramNamiranianResume.pdf" type="application/pdf" style={{width: '800px', height: '1090px', marginTop: '10px;',}}>
                    <embed src="files/PedramNamiranianResume.pdf" type="application/pdf" />
                  </object>
                </div>

                <div style={{paddingLeft: '10px', width: '500px', float: 'left', display: 'inline-block',}}>
                  <h2 style={{marginBottom: '5px',}}>Personal information:</h2>
                  <h3 style={{marginBottom: '-5px',}}>Contact:</h3>
                  <table style={{marginLeft: '43px', marginTop: '10px', marginBottom: '20px',}} class="contact">
                    <tr>
                      <td>Personal number:</td>
                      <td>(408) 207-2574</td>
                    </tr>
                    <tr>
                      <td>Personal email:</td>
                      <td><a href="mailto:namiranianp@gmail.com">namiranianp@gmail.com</a></td>
                    </tr>
                    <tr>
                      <td style={{marginTop: '10px',}}>School email:</td>
                      <td><a href="mailto:pnamiranian@dons.usfca.edu">pnamiranian@dons.usfca.edu</a></td>
                    </tr>
                    <tr>
                      <td>LinkedIn:</td>
                      <td><a href="https://www.linkedin.com/in/pedram-namiranian/">linkedin.com/in/pedram-namiranian/</a></td>
                    </tr>
                    <tr>
                      <td>Github:</td>
                      <td><a href="https://github.com/namiranianp">https://github.com/namiranianp</a></td>
                    </tr>
                  </table>
                  <h3 style={{marginBottom: '-5px',}}>Complete Work History:</h3>
                  <ul style={{listStyleType: 'none', marginLeft: '5px',}} class="workHist">
                    <li>
                      Software Developer <span style={{float: 'right', fontSize: '15px', padding: '0', margin: '0', marginTop: '3px',}}>June 2019-Present</span><br/>
                    </li>
                    <span>McKesson Specialty Health, San Francisco, California</span>
                    <li>
                      Community Assistant <span style={{float: 'right', fontSize: '15px', padding: '0', margin: '0', marginTop: '3px',}}>August 2017-May 2019</span><br/>
                    </li>
                    <span>USF Student Housing and Education, San Francisco, California</span>
                    <li>
                      Teaching Assistant <span style={{float: 'right', fontSize: '15px', padding: '0', margin: '0', marginTop: '3px',}}>September 2016-May 2019</span><br/>
                    </li>
                    <span>USF Department of Computer Science, San Francisco, California</span>
                    <li>
                      Intern <span style={{float: 'right', fontSize: '15px', padding: '0', margin: '0', marginTop: '3px',}}>Summer 2017</span><br/>
                    </li>
                    <span>The Law Offices of Lisa C. Bryant, INC, San Jose, California</span>
                    <li>
                      Senior Recreation Leader <span style={{float: 'right', fontSize: '15px', padding: '0', margin: '0', marginTop: '3px',}}>June 2015-April 2018</span><br/>
                    </li>
                    <span>Department of Recreation and Community Services, Cupertino, California</span>
                    <li>
                      Crew Member <span style={{float: 'right', fontSize: '15px', padding: '0', margin: '0', marginTop: '3px',}}>January 2016-June 2016</span><br/>
                    </li>
                    <span>AMC Theaters, Santa Clara, California</span>
                  </ul>
                  <h3 style={{marginBottom: '-5px',}}>Relevant Education and Courses For CS:</h3>
                  <ul style={{listStyleTpe: 'none', marginBottom: '20px',}} class="education">
                    <li><b>University of San Francisco<span style={{float: 'right',}}> Fall 2016-May 2019</span></b></li>
                    <ul style={{listStyleType: 'none',}}>
                      <li>Senior Team<span style={{float: 'right',}}> Spring 2019</span></li>
                      <li>Network Programming<span style={{float: 'right',}}> Spring 2019</span></li>
                      <li>Computability and Algorithmic Learning Theory<span style={{float: 'right',}}> Fall 2018</span></li>
                      <li>Computer Architecture<span style={{float: 'right',}}> Fall 2018</span></li>
                      <li>Operating Systems<span style={{float: 'right',}}> Spring 2018</span></li>
                      <li>Linear Algebra and Probability<span style={{float: 'right',}}> Spring 2018</span></li>
                      <li>Cryptography<span style={{float: 'right',}}> Fall 2017</span></li>
                      <li>Intro to Parallel Computing<span style={{float: 'right',}}> Fall 2017</span></li>
                      <li>Data Structures and Algorithms<span style={{float: 'right',}}> Spring 2017</span></li>
                      <li>Discrete Mathematics<span style={{float: 'right',}}> Spring 2017</span></li>
                      <li>Software Development<span style={{float: 'right',}}> Fall 2016</span></li>
                    </ul>
                    <li style={{marginTop: '10px',}}><b>Cupertino High School<span style={{float: 'right',}}> Fall 2012-Spring 2016</span></b></li>
                    <ul style={{listStyleType: 'none',}}>
                      <li>AP Computer Science<span style={{float: 'right',}}>Spring 2016</span></li>
                    </ul>
                  </ul>
                  <h3 style={{marginBottom: '-5px',}}>Acomplishments:</h3>
                  <ul style={{listStyleType: 'none', marginBottom: '20px', marginLeft: '5px',}}>
                    <li style={{marginTop: '5px',}}>Google Games Participant</li>
                    <li style={{marginTop: '5px',}}>USFCA Sustainability Hackathon</li>
                    <li style={{marginTop: '5px',}}>Philosophy Club Board Member</li>
                    <li style={{marginTop: '5px',}}>Mock Trial Club Founder</li>
                    <li style={{marginTop: '5px',}}>Gold Award In Law</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            {this.renderHeader(this.allHeaders[2])}

            <div class= "sectionBody" style={{marginLeft: '15px', display: 'inline-block', position: 'relative',}}>
              <p style={{marginTop: '30px',}}>
                <b>Note:</b> This sections lists out the name of my projects and some brief information on them. Clicking on the title will
                take you to the GitHub repository for project.
              </p>
              <ul style={{listStyleType: 'none', marginLeft: '-5px',}} class="projectList">
                <li>
                  <a href="https://github.com/namiranianp/namiranianp.github.io"><h1 style={{marginBottom: '-10px',}}>This Website</h1></a><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  You're looking at the results of this project! Like I mentioned at the top of this site, this was made to organize my
                  GitHub repositories and provide information about myself. If you want to run this site locally, you can clone the
                  repository and open &quot;index.html&quot; in any browser.
                </p>
                <li>
                  <a href="https://github.com/namiranianp/Browser"><h1 style={{marginBottom: '-10px',}}>FileExplorer WebApp</h1></a><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  <b>This is a work in progress and will have visual issues because the prototype was made with a MacBook Air in mind.
                  Future updates will have these issues fixed</b> I made this as an option replace all of the default file explorers that
                  come with operating systems. To run this application, download it from github and enter the main repository through the
                  terminal, from there execute the command &quot;./mvnw spring-boot:run&quot; Once the application completes initialization,
                  go to your browser and navigate to &quot;localhost:8080&quot; and go to the help page available in the menu for all other
                  questions.
                </p>
                <li>
                  <a href="https://github.com/namiranianp/Scripts"><h1 style={{marginBottom: '-10px',}}>Collection of Bash Scripts</h1></a><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  This is a collection of bash scripts I have written to simplify my life. They range from very specific tasks for my job,
                  to general tasks that most programmers would appreciate having automated. This &quot;project&quot; is a constant work in
                  progress as I am always looking for ways to make my life easier and fixing any issues I find.
                </p>
                <li>
                  <a href="https://github.com/namiranianp/Hermod"><h1 style={{marginBottom: '-10px',}}>Covert Communication Over ICMP</h1></a><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  This project was made with the assistant of a classmate while we were both enrolled in Cryptography. The goal was to
                  create an application that allowed users to communicate and securely over a network. We made use of UDP and ICMP to allow
                  users to communicate covertly with each other. Even though anyone can read messages sent using these protocols, we chose
                  to use this path because pairing it with security solved the issue of malicious parties listening.
                </p>
                <li>
                  <a href="https://github.com/namiranianp/Shell"><h1 style={{marginBottom: '-10px',}}>Shell</h1></a><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  This is a replacement for the existing shell for Linux and MacOS. It supports all regular commands that any shell would,
                  including piping, redirecting, and forking. To run this, simply compile the files into one executable and execute it.
                </p>
                <li>
                  <h1 style={{marginBottom: '-10px',}}>Search Engine</h1><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  This application is not available to view through a link because it was made during a software development course and the
                  professor asks her students not to create public versions of their code to prevent academic dishonesty. If you wish to
                  view this project, please contact me and I can make a copy of the source code available to you. For this project I worked
                  on the all aspects of creating a running web application, namely a search engine. This project gave me exposure to
                  technologies and conventions used by programmers working on all parts of the stack.
                </p>
                <li>
                  <a href="https://github.com/namiranianp/Adventure-Game"><h1 style={{marginBottom: '-10px',}}>Adventure Game</h1></a><br/>
                </li>
                <p style={{marginBottom: '10px', maxWidth: '1000px',}}>
                  For my final project in AP Computer Science in high school, two other students and myself teamed up to make an adventure
                  game using only Java. The goal was to mimic the 8-bit style of older games and to make use of the MVC structure. This
                  assignment was a lot of fun to create, and was my first exposure to Github and version control.
                </p>
              </ul>
            </div>
          </div>

          <div class="section">
            {this.renderHeader(this.allHeaders[3])}

            <div class= "sectionBody" style={{marginLeft: '15px', display: 'inline-block',}}>
              <h2>Why philosophy?</h2>
              <p style={{maxWidth: '1000px', marginLeft: '35px',}}>
                I have always had a passion for learning and debating and I initially wanted to go to law school, but when computer science
                stole my attention I decided to also take up philosophy to continue exploring questions about the world and existence. The
                reason why it is included on this web page specifically is because philosophy is useful for more than just quoting other
                philosophers. This field promotes critical thinking, drawing conclusions from the writings of others, and conveying ideas
                clearly. All of these skills are useful for every aspect of life, which is what makes philosophy such a great thing to study.
              </p><br/>

              <h2 style={{marginBottom: '10px',}}>Anthropocentrism, Materialism, and Racism</h2>
              <b style={{marginLeft: '35px', display: 'inline-block', float: 'left',}}>Abstract:</b>
              <p style={{maxWidth: '900px', display: 'inline-block', marginTop: '0px', marginLeft: '5px',}}>
                In this paper I discuss what Anthropocentrism is and the dangers that this bias poses towards humanity and all of philosophy.
                I briefly touch upon AI consciousness and rights, but the main purpose of this paper is to bring awareness to the
                anthropocentric biases that most people inherently have
              </p>
              <div class="essayLink">
                <a onclick="showEssay('a1','b1');" id="a1">View Essay</a>
                <a style={{display: 'none',}} onclick="hideEssay('b1','a1');" id="b1">Hide Essay</a><br/>
                <object style={{marginLeft: '35px', width: '800px', height: '1090px', marginTop: '10px', display: 'none',}} data="files/Anthropocentrism, Materialism, and Racism.pdf" id="essayPdfa1">
                  <embed src="files/Anthropocentrism, Materialism, and Racism.pdf" height="400px" width="400px"></embed>
                </object>
              </div>

              <h2 style={{marginBottom: '10px',}}>“Artificial” Intelligence and Consciousness Through the Lens of Pragmatism</h2>
              <b style={{marginLeft: '35px', display: 'inlineBlock', float: 'left',}}>Abstract:</b>
              <p style={{maxWidth: '900px', display: 'inlineBlock', marginTop: '0px', marginLeft: '5px',}}>
                For my final paper in the course "Pragmatism" I wrote about what it means to a pragmatist for something to be conscious, and
                the implications this has for artificial intelligence. This paper discusses the practical use for human consciousness and
                also delves into other issues such as how anthropocentrism hinders our ability to discover what it means to be conscious,
                and the futility of these questions due to the language game. I also cite "Does My Toaster Get Rights?" which is available
                to view here.
              </p>
              <div class="essayLink">
              <a onclick="showEssay('a3','b3');" id="a3">View Essay</a>
              <a style={{display: 'none',}} onclick="hideEssay('b3','a3');" id="b3">Hide Essay</a><br/>
              <object style={{marginLeft: '35px', width: '800px', height: '1090px', marginTop: '10px', display: 'none',}} data="files/pragmatism.pdf" id="essayPdfa3">
                <embed src="files/pragmatism.pdf" height="400px" width="400px"></embed>
              </object>
              </div>

              <h2 style={{marginBottom: '10px',}}>Does My Toaster Get Rights?</h2>
              <b style={{marginLeft: '35px', display: 'inlineBock', float: 'left',}}>Abstract:</b>
              <p style={{maxWidth: '900px', display: 'inlineBlock', marginTop: '0px', marginLeft: '5px',}}>
                In this paper I talk about the various characters I ran into while playing Fallout 4 and their various beliefs on the rights
                of artificial intelligence. Using these fantasy characters I explore whether or not we should include AI in our moral
                discussion, whether they can ever be said to be conscious, and if that matters when it comes to discussing morality.
              </p>
              <div style={{marginBottom: '50px',}} class="essayLink">
              <a onclick="showEssay('a4','b4');" id="a4">View Essay</a>
              <a style={{display: 'none',}} onclick="hideEssay('b4','a4');" id="b4">Hide Essay</a><br/>
              <object style={{marginLeft: '35px', width: '800px', height: '1090px', marginTop: '10px', display: 'none',}} data="files/Ethics Final Essay.pdf" id="essayPdfa4">
                <embed src="files/Ethics Final Essay.pdf" height="400px" width="400px"></embed>
              </object>
              </div>

              <h2 style={{marginBottom: '10px',}}>Freedom of Will or Action?</h2>
              <b style={{marginLeft: '35px', display: 'inlineBlock', float: 'left',}}>Abstract:</b>
              <p style={{maxWidth: '900px', display: 'inlineBlock', marginTop: '0px', marginLeft: '5px',}}>
                In this paper I discuss what various philosophers have claimed about free will and the merits of their ways of thought. The
                conclusion I reach is that freedom of will, at least in the traditional sense, can not exist. What we have instead is what
                David Hume calls free will, but can be better described as freedom of action.
              </p>
              <div class="essayLink">
              <a onclick="showEssay('a2','b2');" id="a2">View Essay</a>
              <a style={{display: 'none',}} onclick="hideEssay('b2','a2');" id="b2">Hide Essay</a><br/>
              <object style={{marginLeft: '35px', width: '800px', height: '1090px', marginTop: '10px', display: 'none',}} data="files/Third Essay.pdf" id="essayPdfa2">
                <embed src="files/Third Essay.pdf" height="400px" width="400px"></embed>
              </object>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
