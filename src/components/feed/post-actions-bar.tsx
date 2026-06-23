import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router";
import { useContext, useState } from 'react';

import { ColorsContext } from '@/context/colors-context';
import { FeedPost } from '@/data/mock-feed';
import { LikeButton } from './actions/like-button';
import { ShareButton } from './actions/share-button';
import { BookmarkButton } from './actions/bookmark-button';

interface PostActionsBarProps {
	post: FeedPost
}

export const PostActionsBar = ({post}: PostActionsBarProps) => {
	const colors = useContext(ColorsContext);
	const router = useRouter();
	const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [shareCount, setShareCount] = useState(0);

	const onLike = () => {
    setIsLiked((prevIsLiked) => {
      const nextIsLiked = !prevIsLiked;
      setLikesCount(
        (prevLikesCount) => prevLikesCount + (nextIsLiked ? 1 : -1),
      );
      return nextIsLiked;
    });
  };

	return (
		<>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: 12,
					paddingVertical: 8
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
					<LikeButton isLiked={isLiked} colors={colors} onPress={onLike} />
					<ShareButton
						postId={post.id}
						username={post.user.username}
						colors={colors}
						onShareComplete={() =>
								setShareCount((prevShareCount) => prevShareCount + 1)}
					/>
				</View>
				<BookmarkButton initialIsBookmarked={post.isBookmarked} colors={colors} />
			</View>

			<View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12 }}>
				<TouchableOpacity onPress={() => router.push(`/likes/${post.id}`)}>
					<Text style={{ fontWeight: "600", fontSize: 14, color: colors.text }}>
						{likesCount.toLocaleString()} likes
					</Text>
				</TouchableOpacity>
				{shareCount > 0 && (
					<Text style={{ fontSize: 14, color: colors.icon }}>
						· {shareCount} {shareCount === 1 ? "share" : "shares"}
					</Text>
				)}
			</View>
		</>
	)
}
