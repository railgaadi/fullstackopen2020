import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return <h1>{course.name}</h1>
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((total, num) => total + num.exercises, 0);
    return <p><strong>Total:{totalExercises}</strong></p>
}

export default Course