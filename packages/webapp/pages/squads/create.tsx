import React, {
  FormEvent,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';
import { useRouter } from 'next/router';
import {
  WriteFreeformContent,
  WriteFreeFormSkeleton,
  WritePageContainer,
} from '@nxenv/shared/src/components/post/freeform';
import { useMutation } from '@tanstack/react-query';
import {
  createPost,
  CreatePostProps,
} from '@nxenv/shared/src/graphql/posts';
import { useToastNotification } from '@nxenv/shared/src/hooks/useToastNotification';
import { ApiErrorResult } from '@nxenv/shared/src/graphql/common';
import { useAuthContext } from '@nxenv/shared/src/contexts/AuthContext';
import { useDiscardPost } from '@nxenv/shared/src/hooks/input/useDiscardPost';
import { WritePostContextProvider } from '@nxenv/shared/src/contexts';
import TabContainer, {
  Tab,
} from '@nxenv/shared/src/components/tabs/TabContainer';
import { ShareLink } from '@nxenv/shared/src/components/post/write/ShareLink';
import {
  generateDefaultSquad,
  SquadsDropdown,
} from '@nxenv/shared/src/components/post/write';
import Unauthorized from '@nxenv/shared/src/components/errors/Unauthorized';
import { verifyPermission } from '@nxenv/shared/src/graphql/squads';
import { SourcePermissions } from '@nxenv/shared/src/graphql/sources';
import {
  useActions,
  useViewSize,
  ViewSize,
} from '@nxenv/shared/src/hooks';
import { useSquadCreate } from '@nxenv/shared/src/hooks/squads/useSquadCreate';
import { formToJson } from '@nxenv/shared/src/lib/form';
import { ActionType } from '@nxenv/shared/src/graphql/actions';
import {
  WriteFormTab,
  WriteFormTabToFormID,
} from '@nxenv/shared/src/components/fields/form/common';
import { getLayout as getMainLayout } from '../../components/layouts/MainLayout';
import { defaultOpenGraph, defaultSeo } from '../../next-seo';

const seo: NextSeoProps = {
  title: 'Create post',
  openGraph: { ...defaultOpenGraph },
  ...defaultSeo,
};

function CreatePost(): ReactElement {
  const { completeAction } = useActions();
  const { push, isReady: isRouteReady, query } = useRouter();
  const { squads, user, isAuthReady, isFetched } = useAuthContext();
  const [selected, setSelected] = useState(-1);
  const activeSquads = useMemo(() => {
    const collator = new Intl.Collator('en');
    const filtered = squads
      ?.filter(
        (squadItem) =>
          squadItem?.active &&
          verifyPermission(squadItem, SourcePermissions.Post),
      )
      .sort((a, b) => collator.compare(a.name, b.name));

    if (!user) {
      return filtered;
    }

    return [
      {
        ...generateDefaultSquad(user.username),
        name: 'Create new Squad',
        handle: null,
      },
      ...filtered,
    ];
  }, [squads, user]);
  const squad = activeSquads?.[selected];
  const [display, setDisplay] = useState(WriteFormTab.NewPost);
  const { displayToast } = useToastNotification();
  const isMobile = useViewSize(ViewSize.MobileL);
  const isTablet = useViewSize(ViewSize.Tablet);
  const {
    onAskConfirmation,
    draft,
    updateDraft,
    formRef,
    clearDraft,
    isUpdatingDraft,
  } = useDiscardPost({ draftIdentifier: squad?.id });
  const {
    mutateAsync: onCreatePost,
    isPending: isPosting,
    isSuccess,
  } = useMutation({
    mutationFn: createPost,
    onMutate: () => {
      onAskConfirmation(false);
    },
    onSuccess: async (post) => {
      clearDraft();
      await push(post.commentsPermalink);

      completeAction(ActionType.SquadFirstPost);
    },
    onError: (data: ApiErrorResult) => {
      if (data?.response?.errors?.[0]) {
        displayToast(data?.response?.errors?.[0].message);
      }
      onAskConfirmation(true);
    },
  });
  const { onCreateSquad, isLoading } = useSquadCreate({
    onSuccess: (newSquad) => {
      const form = formToJson<CreatePostProps>(formRef.current);

      return onCreatePost({ ...form, sourceId: newSquad.id });
    },
    retryWithRandomizedHandle: true,
  });

  const param = isRouteReady && activeSquads?.length && (query.sid as string);
  const shareParam = query.share as string;

  useEffect(() => {
    if (!param) {
      return;
    }

    const preselected = activeSquads.findIndex(({ id, handle }) =>
      [id, handle].includes(param),
    );
    setSelected((value) => (value >= 0 ? value : preselected));
  }, [activeSquads, param]);

  useEffect(() => {
    if (!shareParam) {
      return;
    }

    setDisplay(WriteFormTab.Share);
  }, [shareParam]);

  const onClickSubmit = async (e: FormEvent<HTMLFormElement>, params) => {
    if (isPosting || isSuccess || isLoading) {
      return null;
    }

    if (!squad) {
      displayToast('Select a Squad to post to!');
      return null;
    }

    if (squads.some(({ id }) => squad.id === id)) {
      return onCreatePost({ ...params, sourceId: squad.id });
    }

    await onCreateSquad(generateDefaultSquad(user.username));

    return null;
  };

  if (!isFetched || !isAuthReady || !isRouteReady) {
    return <WriteFreeFormSkeleton />;
  }

  if (!user || (!activeSquads?.length && isAuthReady)) {
    return <Unauthorized />;
  }

  return (
    <WritePostContextProvider
      draft={draft}
      squad={squad}
      formRef={formRef}
      isUpdatingDraft={isUpdatingDraft}
      isPosting={isPosting || isSuccess || isLoading}
      updateDraft={updateDraft}
      onSubmitForm={onClickSubmit}
      formId={WriteFormTabToFormID[display]}
      enableUpload
    >
      <WritePageContainer>
        <NextSeo {...seo} titleTemplate="%s | nxenv.khulnasoft.com" noindex nofollow />
        <TabContainer<WriteFormTab>
          onActiveChange={(active) => setDisplay(active)}
          controlledActive={display}
          shouldMountInactive
          className={{ header: 'px-1' }}
          showHeader={isTablet}
        >
          <Tab label={WriteFormTab.NewPost} className="px-5">
            {isMobile && (
              <h2 className="pt-2 font-bold typo-title3">New post</h2>
            )}
            <SquadsDropdown
              list={activeSquads}
              onSelect={setSelected}
              selected={selected}
            />
            <WriteFreeformContent className="mt-6" />
          </Tab>
          <Tab label={WriteFormTab.Share} className="px-5">
            {isMobile && (
              <h2 className="pt-2 font-bold typo-title3">Share a link</h2>
            )}
            <SquadsDropdown
              list={activeSquads}
              onSelect={setSelected}
              selected={selected}
            />
            <ShareLink
              squad={squad}
              className="mt-4"
              onPostSuccess={() => {
                onAskConfirmation(false);
              }}
            />
          </Tab>
        </TabContainer>
      </WritePageContainer>
    </WritePostContextProvider>
  );
}

CreatePost.getLayout = getMainLayout;

export default CreatePost;
