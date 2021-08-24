import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";

export default function RegisterSuccess() {
  const email = useQuery().get("email") as string;

  function handleConfirmEmailResend() {
    agent.Account.resendEmailConfirmation(email)
      .then(() => {
        toast.success(
          "Verification Email sent again - Please check your Email"
        );
      })
      .catch((error) => console.log(error));
  }

  return (
    <Segment placeholder textAlign="center">
      <Header icon color="green">
        <Icon name="check" />
        Successfully registered!
      </Header>
      <p>
        Please check your Email (including junk emails) for the verification
        email.
      </p>
      {email && (
        <>
          <p>Didn't recieve email? Please click below button to resend</p>
          <Button
            primary
            onClick={handleConfirmEmailResend}
            content="Resend Email"
            size="huge"
          />
        </>
      )}
    </Segment>
  );
}
