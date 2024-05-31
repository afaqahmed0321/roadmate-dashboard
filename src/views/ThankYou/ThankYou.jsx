import { CreditScoreIcon, Heading, Message, ThankYouContainer } from "./thankyou.styled";

const ThankYouPage = () => {
  return (
    <ThankYouContainer>
      <CreditScoreIcon />
      <Heading variant="h2">Thank You!</Heading>
      <Message variant="body1">
        Onboarding completed successfully
      </Message>
    </ThankYouContainer>
  );
};

export default ThankYouPage;
