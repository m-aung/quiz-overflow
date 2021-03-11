import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentScore: state.quiz.currentScore,
});

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scoreUpdated: false };
  }

  componentDidUpdate(prevProps) {
    // console.log('componentUpdate triggered')
    if (prevProps.currentScore !== this.props.currentScore) {
      this.setState({ scoreUpdated: true });
      return true;
    }
  }

  getFeedbackElement() {
    // console.log('getFeedback triggered');
    if (this.props.currentScore === 0) {
      // console.log('zero detected!');
      return (
        <div
          key={this.props.currentScore}
          currentScore={this.props.currentScore}
        ></div>
      );
    } else if (this.componentDidUpdate) {
      return (
        <div
          key={this.props.currentScore}
          currentScore={this.props.currentScore}
          className="correctFeedback"
        >
          ✓
        </div>
      );
    }
  }

  toggleScoreUpdated() {
    // console.log('toggle detected')
    this.setState({ scoreUpdated: false });
  }

  render() {
    const feedback = this.getFeedbackElement();
    if (this.state.scoreUpdated) {
      this.toggleScoreUpdated();
    }
    return (
      <div>
        <div className="feedbackContainer">
          {feedback}
          {/* <div key={this.props.currentScore}className="correctFeedback">✓</div> */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Feedback);
