import React, { FormEvent, ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  WriteFreeformContent,
  WritePage,
  WritePostHeader,
} from '@nxenv/shared/src/components/post/freeform';
import { editPost, PostType } from '@nxenv/shared/src/graphql/posts';
import usePostById from '@nxenv/shared/src/hooks/usePostById';
import { useAuthContext } from '@nxenv/shared/src/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { useToastNotification } from '@nxenv/shared/src/hooks/useToastNotification';
import { ApiErrorResult } from '@nxenv/shared/src/graphql/common';
import { useDiscardPost } from '@nxenv/shared/src/hooks/input/useDiscardPost';
import { NextSeo, NextSeoProps } from 'next-seo';
import { WritePostContextProvider } from '@nxenv/shared/src/contexts';
import { verifyPermission } from '@nxenv/shared/src/graphql/squads';
import { SourcePermissions } from '@nxenv/shared/src/graphql/sources';
import { ShareLink } from '@nxenv/shared/src/components/post/write/ShareLink';
import { useActions } from '@nxenv/shared/src/hooks';
import { ActionType } from '@nxenv/shared/src/graphql/actions';
import {
  WriteFormTab,
  WriteFormTabToFormID,
} from '@nxenv/shared/src/components/fields/form/common';
import { getLayout as getMainLayout } from '../../../components/layouts/MainLayout';
import { defaultOpenGraph, defaultSeo } from '../../../next-seo';

function EditPost(): ReactElement {
  const { completeAction } = useActions();
  const { query, isReady, push } = useRouter();
  const { post, isLoading } = usePostById({ id: query.id as string });
  const { squads, user } = useAuthContext();
  const formId =
    post?.type === PostType.Share
      ? WriteFormTabToFormID[WriteFormTab.Share]
      : WriteFormTabToFormID[WriteFormTab.NewPost];
  const squad = squads?.find(({ id, handle }) =>
    [id, handle].includes(post?.source?.id),
  );
  const isVerified = verifyPermission(squad, SourcePermissions.Post);
  const { displayToast } = useToastNotification();
  const {
    onAskConfirmation,
    draft,
    updateDraft,
    isDraftReady,
    isUpdatingDraft,
    formRef,
    clearDraft,
  } = useDiscardPost({ post });
  const {
    mutateAsync: onUpdatePost,
    isPending: isPosting,
    isSuccess,
  } = useMutation({
    mutationFn: editPost,
    onMutate: () => {
      onAskConfirmation(false);
    },
    onSuccess: async (data) => {
      clearDraft();
      await push(data.commentsPermalink);

      if (data.type === PostType.Welcome) {
        completeAction(ActionType.EditWelcomePost);
      }
    },
    onError: (data: ApiErrorResult) => {
      if (data?.response?.errors?.[0]) {
        displayToast(data?.response?.errors?.[0].message);
      }
      onAskConfirmation(true);
    },
  });

  const onClickSubmit = (e: FormEvent<HTMLFormElement>, params) => {
    if (isPosting || isSuccess) {
      return null;
    }

    return onUpdatePost({ ...params, id: post.id });
  };

  const seo: NextSeoProps = {
    title: `Edit - ${post?.title ?? ''} | ${post?.source?.name}`,
    openGraph: { ...defaultOpenGraph },
    titleTemplate: '%s | nxenv.khulnasoft.com',
    ...defaultSeo,
  };

  const isAuthor = post?.author.id === user?.id;

  const canEdit = (() => {
    if (isAuthor) {
      return true;
    }

    if (post?.type !== PostType.Welcome) {
      return false;
    }

    return verifyPermission(squad, SourcePermissions.WelcomePostEdit);
  })();

  return (
    <WritePostContextProvider
      post={post}
      draft={draft}
      squad={squad}
      formRef={formRef}
      isUpdatingDraft={isUpdatingDraft}
      isPosting={isPosting || isSuccess}
      updateDraft={updateDraft}
      onSubmitForm={onClickSubmit}
      formId={formId}
      enableUpload
    >
      <NextSeo {...seo} noindex nofollow />
      <WritePage
        isEdit
        isLoading={!isReady || isLoading || !isDraftReady}
        isForbidden={!isVerified || !squad || !canEdit}
      >
        <WritePostHeader isEdit />

        {post?.type === PostType.Share ? (
          <ShareLink
            post={post}
            squad={squad}
            className="px-4 py-6"
            onPostSuccess={() => {
              onAskConfirmation(false);
              push(squad.permalink);
            }}
          />
        ) : (
          <WriteFreeformContent className="px-4 py-6" />
        )}
      </WritePage>
    </WritePostContextProvider>
  );
}

EditPost.getLayout = getMainLayout;

export default EditPost;
