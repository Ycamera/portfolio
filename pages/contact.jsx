import React, { useState } from "react";
import { Box, Flex, Text, Textarea, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Motion from "/components/Motion.jsx";
import { useForm } from "react-hook-form";
import TransitionEffect from "../components/background/TransitionEffect";

const textStyle = {
  fontSize: "1.2rem",
  letterSpacing: "0.2rem",
};

const Form = ({ label, placeholder, textarea = false, register, errors, id, nextId, value }) => {
  function focus(e, id) {
    if (e.key === "Enter") {
      const element = document.getElementById(id);
      element.focus();
    }
  }

  return (
    <FormControl mb="1rem">
      <FormLabel {...textStyle}>
        {label}
        <Text as="span" display="inline-block" color="red.200">
          *
        </Text>
      </FormLabel>
      {!textarea ? (
        <Input
          id={id}
          {...register}
          value={value}
          onKeyUp={(e) => {
            focus(e, nextId);
          }}
        />
      ) : (
        <Textarea id={id} minH="15rem" {...register} value={value} />
      )}
      <Box color="red.300" fontSize="0.8rem" mt="0.5rem" textAlign="right">
        　{errors[id] && errors[id]?.message}
      </Box>
    </FormControl>
  );
};

const Contact = () => {
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const required = { required: { value: true, message: "*この項目は必須です" } };

  function onChangeEmail({ target }) {
    const value = target.value.replace(/\s|[^@_.a-zA-Z0-9]/g, "");
    setEmail(value);
  }

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <TransitionEffect />
      <Flex as="section" w="100%" minH="100vh" bg="#000" justifyContent={"center"} alignItems="center" flexDirection="column" boxSizing="initial">
        <Flex w="100%" maxW="50rem" h="100%" mt="7rem" px="1rem" justifyContent={"center"} alignItems="center" flexDirection="column">
          <Motion initial={{ y: "5rem", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.54, 0.23, 0.26, 0.98] }}>
            <Text as="h1" w="100%" fontSize="4rem" letterSpacing="0.5rem" textAlign="center">
              CONTACT
            </Text>
          </Motion>

          <Motion
            initial={{ y: "5rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 40, mass: 0.5, delay: 0.3 }}
          >
            <Flex
              as="form"
              w="100%"
              py="2rem"
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              {...textStyle}
              // boxShadow="0 0 100px gray"
            >
              <Form
                label="Name"
                placeholder="Your Name"
                id="name"
                nextId="email"
                errors={errors}
                register={{
                  ...register("name", {
                    ...required,
                  }),
                }}
              />
              <Form
                label="E-mail"
                placeholder="Your E-mail"
                id="email"
                nextId="message"
                errors={errors}
                value={email}
                register={{
                  ...register("email", {
                    ...required,
                    pattern: {
                      value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                      message: "*有効なメールアドレスを入力してください",
                    },
                    onChange: onChangeEmail,
                  }),
                }}
              />
              <Form
                label="Message"
                placeholder="Your Message"
                textarea={true}
                id="message"
                errors={errors}
                register={{
                  ...register("message", {
                    ...required,
                  }),
                }}
              />
              <Flex
                id="submit-btn"
                borderRadius="0.2rem"
                my="1rem"
                right="0"
                w="100%"
                maxW="10rem"
                h="3rem"
                pos="relative"
                cursor="pointer"
                justifyContent={"center"}
                alignItems="center"
                onClick={handleSubmit(onSubmit)}
                bg="transparent"
                _focus={{ boxShadow: "none" }}
              >
                <Text as="span" {...textStyle}>
                  Submit
                </Text>
                <Box w="100%" h="0.06rem" pos="absolute" top="0" bg="#fff" left="50%" transform="translateX(-50%)" />
                <Box w="100%" h="0.06rem" pos="absolute" bottom="0" bg="#fff" left="50%" transform="translateX(-50%)" />
              </Flex>
            </Flex>
          </Motion>
        </Flex>
      </Flex>
    </>
  );
};

export default Contact;
