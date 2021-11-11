import React, { FC } from "react";
import { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const AddTask: FC = () => {
  const {} = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    console.log(watch("example"));
  }, []);

  return (
    <section className="addtask-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="task-name">Task name</label>
        <input
          placeholder="Task name"
          id="task-name"
          {...register("example")}
        />
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Description"
          id="description"
          {...register("exampleRequired", { required: true })}
        ></textarea>
        {errors.exampleRequired && <span>This field is required</span>}
        <input value="Add task" type="submit" />
      </form>
    </section>
  );
};