import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import questionService from "../Services/questionService";
import { CircularProgress } from "@mui/material";
import QuestionComponent from "../components/QuestionComponent";

function Quiz({
  name,
  selectedCategory,
  difficulty,
  CategoryName,
  score,
  setScore,
}) {
  const [options, setOptions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();

  const { data: questions } = useQuery(
    "question-list",
    () =>
      questionService.getQuestions({
        categories: CategoryName(selectedCategory),
        limit: 10,
        difficulty: difficulty,
      }),
    {
      onSuccess: (res) => {
        setCurrentQuestion(res[0]);
        setOptions(
          handleShuffle([...res[0].incorrectAnswers, res[0].correctAnswer])
        );
      },
    }
  );

  const onNext = () => {};

  const handleShuffle = (answerOptions) => {
    return answerOptions.sort(() => Math.random() - 0.5);
  };

  return (
    <div>
      <WelcomeHeader>Welcome, {name}</WelcomeHeader>
      {questions ? (
        <>
          <QuizInfo>
            <span>
              <b>Category:</b> {selectedCategory}
            </span>
            <span>
              <b>Difficulty:</b> {difficulty}
            </span>
            <span>
              <b>Score:</b> {score}
            </span>
          </QuizInfo>
          <QuestionComponent
            currentQuestion={currentQuestion}
            options={options}
            correctAnswer={currentQuestion.correctAnswer}
            onNext={onNext}
          />
        </>
      ) : (
        <StyledCircularProgress size={150} thickness={1} />
      )}
    </div>
  );
}

export default Quiz;

const StyledCircularProgress = styled(CircularProgress)`
  margin: 100px;
  color: #2596be;
`;

const WelcomeHeader = styled.div`
  width: fit-content;
  block-size: fit-content;
  font-size: 25px;
  border: 1px solid black;
  box-shadow: 4px 4px 2px black;
  padding: 5px 10px;
  margin: auto;
  text-align: center;
`;
const QuizInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  margin: 10px;
`;
