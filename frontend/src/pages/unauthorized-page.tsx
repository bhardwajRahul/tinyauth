import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trans, useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";

export const UnauthorizedPage = () => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const username = searchParams.get("username");
  const resource = searchParams.get("resource");
  const groupErr = searchParams.get("groupErr");

  if (!username) {
    return <Navigate to="/" />;
  }

  const { t } = useTranslation();
  const navigate = useNavigate();

  let i18nKey = "unauthorizedLoginSubtitle";

  if (resource) {
    i18nKey = "unauthorizedResourceSubtitle";
  }

  if (groupErr === "true") {
    i18nKey = "unauthorizedGroupsSubtitle";
  }

  return (
    <Card className="min-w-xs sm:min-w-sm">
      <CardHeader>
        <CardTitle className="text-3xl">{t("unauthorizedTitle")}</CardTitle>
        <CardDescription>
          <Trans
            i18nKey={i18nKey}
            t={t}
            components={{
              code: <code />,
            }}
            values={{
              username,
              resource,
            }}
          />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-stretch">
        <Button onClick={() => navigate("/login")}>
          {t("unauthorizedButton")}
        </Button>
      </CardFooter>
    </Card>
  );
};
