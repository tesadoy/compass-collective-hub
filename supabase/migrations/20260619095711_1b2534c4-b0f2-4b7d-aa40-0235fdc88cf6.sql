DROP POLICY IF EXISTS "Users view messages" ON public.messages;
DROP POLICY IF EXISTS "Users can view messages" ON public.messages;
DROP POLICY IF EXISTS "Clients view their messages" ON public.messages;
DROP POLICY IF EXISTS "Users view their messages" ON public.messages;

CREATE POLICY "Clients and admins view messages"
ON public.messages
FOR SELECT
TO authenticated
USING (
  client_id = auth.uid()
  OR public.has_role(auth.uid(), 'admin'::app_role)
);