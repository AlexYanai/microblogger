# mix run priv/repo/seeds.exs
import Ecto
alias Microblogger.{Repo, User, Category, Post, PostCategory}

# List of users to be created
users = [
  %{username: "Test UserA", email: "a@a.com", password: "aaaaaa", bio: Faker.Lorem.paragraph(%Range{first: 1, last: 2})},
  %{username: "Test UserB", email: "b@b.com", password: "bbbbbb", bio: Faker.Lorem.paragraph(%Range{first: 1, last: 2})},
  %{username: "Test UserC", email: "c@c.com", password: "cccccc", bio: Faker.Lorem.paragraph(%Range{first: 1, last: 2})},
  %{username: "Test UserD", email: "d@d.com", password: "dddddd", bio: Faker.Lorem.paragraph(%Range{first: 1, last: 2})}
]

# Create the Users
users
  |> Enum.map(&User.registration_changeset(%User{}, &1))
  |> Enum.each(&Repo.insert!(&1))

# List of categories to be created
categories = [
  %{name: "General", description: "General Category"},
  %{name: "Random", description: "rgfisgfu gfdsg shdfk  gfsjd gksfdh rewrejh"},
  %{name: "Test One", description: "This is a test explanation for a category"},
  %{name: "Computer Science", description: "The study of the theory, experimentation, and engineering that form the basis for the design and use of computers"},
  %{name: "Literature", description: "Literature, in its broadest sense, is any single body of written works."},
  %{name: "Beer", description: "Beer is the oldest and most widely consumed alcoholic drink in the world, and the third most popular drink overall after water and tea."},
]

# Create the categories
categories
  |> Enum.map(&Category.changeset(%Category{}, &1))
  |> Enum.each(&Repo.insert!(&1))

# Get a user and a category
user_one       = User     |> Repo.get(1)
user_two       = User     |> Repo.get(2)
user_three     = User     |> Repo.get(3)
user_four      = User     |> Repo.get(4)

category_one   = Category |> Repo.get(1)
category_two   = Category |> Repo.get(4)
category_three = Category |> Repo.get(5)
category_four  = Category |> Repo.get(6)

# List of general posts to be created
posts = [
  %{title: "test", source: "http://www.example.testurl", quote: "test quote\ntest text test test test test test test", is_public: true},
  %{title: "test note for something", source: "http://www.somethingimportant.testurl", quote: "something, something, something, something", is_public: false},
  %{title: "something important", source: "A book", quote: "Some book quote, Some book quote, Some book quote, Some book quote.", is_public: true}
]

# List of CS posts to be created
cs_posts = [
  %{title: "Priority Queue", source: "https://en.wikipedia.org/wiki/Priority_queue", quote: "In computer science, a priority queue is an abstract data type which is like a regular queue or stack data structure, but where additionally each element has a 'priority' associated with it. In a priority queue, an element with high priority is served before an element with low priority. If two elements have the same priority, they are served according to their order in the queue.", is_public: true},
  %{title: "Stack", source: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)", quote: "In computer science, a stack is an abstract data type that serves as a collection of elements, with two principal operations: push, which adds an element to the collection, and pop, which removes the most recently added element that was not yet removed. ", is_public: false},
  %{title: "Stack", source: "https://en.wikipedia.org/wiki/Stack_(abstract_data_type)", quote: "In computer science, a stack is an abstract data type that serves as a collection of elements, with two principal operations: push, which adds an element to the collection, and pop, which removes the most recently added element that was not yet removed. ", is_public: false},
  %{title: "Linked List", source: "https://en.wikipedia.org/wiki/Linked_list", quote: "In computer science, a linked list is a linear collection of data elements, in which linear order is not given by their physical placement in memory. Each pointing to the next node by means of a pointer. It is a data structure consisting of a group of nodes which together represent a sequence. Under the simplest form, each node is composed of data and a reference (in other words, a link) to the next node in the sequence. This structure allows for efficient insertion or removal of elements from any position in the sequence during iteration. More complex variants add additional links, allowing efficient insertion or removal from arbitrary element references.", is_public: true},
  %{title: "Array", source: "https://en.wikipedia.org/wiki/Array_data_structure", quote: "In computer science, an array data structure, or simply an array, is a data structure consisting of a collection of elements (values or variables), each identified by at least one array index or key. An array is stored so that the position of each element can be computed from its index tuple by a mathematical formula. The simplest type of data structure is a linear array, also called one-dimensional array.", is_public: true},
  %{title: "Heap", source: "https://en.wikipedia.org/wiki/Heap_(data_structure)", quote: "In computer science, a heap is a specialized tree-based data structure that satisfies the heap property: if P is a parent node of C, then the key (the value) of node P is greater than the key of node C. A heap can be classified further as either a 'max heap' or a 'min heap'. In a max heap, the keys of parent nodes are always greater than or equal to those of the children and the highest key is in the root node. In a min heap, the keys of parent nodes are less than or equal to those of the children and the lowest key is in the root node.", is_public: true},
  %{title: "Binary Heap", source: "https://en.wikipedia.org/wiki/Binary_heap", quote: "A binary heap is a heap data structure that takes the form of a binary tree. Binary heaps are a common way of implementing priority queues.[1]:162–163 The binary heap was introduced by J. W. J. Williams in 1964, as a data structure for heapsort.", is_public: false},
  %{title: "Binary Tree", source: "https://en.wikipedia.org/wiki/Binary_tree", quote: "In computer science, a binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child. A recursive definition using just set theory notions is that a (non-empty) binary tree is a triple (L, S, R), where L and R are binary trees or the empty set and S is a singleton set.[1] Some authors allow the binary tree to be the empty set as well", is_public: true},
  %{title: "Bloom Filter", source: "https://en.wikipedia.org/wiki/Bloom_filter", quote: "A Bloom filter is a space-efficient probabilistic data structure, conceived by Burton Howard Bloom in 1970, that is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not - in other words, a query returns either 'possibly in set' or 'definitely not in set'. Elements can be added to the set, but not removed (though this can be addressed with a 'counting' filter); the more elements that are added to the set, the larger the probability of false positives.", is_public: true},
  %{title: "Skip List", source: "https://en.wikipedia.org/wiki/Skip_list", quote: "In computer science, a skip list is a data structure that allows fast search within an ordered sequence of elements. Fast search is made possible by maintaining a linked hierarchy of subsequences, with each successive subsequence skipping over fewer elements than the previous one.", is_public: false}
]

# List of Shakespeare posts to be created
shak_posts = [
  %{title: "As You Like It 1", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.as_you_like_it, is_public: true},
  %{title: "As You Like It 2", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.as_you_like_it, is_public: false},
  %{title: "As You Like It 3", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.as_you_like_it, is_public: true},
  %{title: "Hamlet 1", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.hamlet, is_public: true},
  %{title: "Hamlet 2", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.hamlet, is_public: false},
  %{title: "Hamlet 3", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.hamlet, is_public: true},
  %{title: "King Richard III 1", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.king_richard_iii, is_public: true},
  %{title: "King Richard III 2", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.king_richard_iii, is_public: false},
  %{title: "King Richard III 3", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.king_richard_iii, is_public: true},
  %{title: "Romeo And Juliet 1", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.romeo_and_juliet, is_public: false},
  %{title: "Romeo And Juliet 2", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.romeo_and_juliet, is_public: true},
  %{title: "Romeo And Juliet 3", source: Faker.Internet.url, quote: Faker.Lorem.Shakespeare.romeo_and_juliet, is_public: true}
]

# List of Beer posts to be created
beer_posts = [
  %{title: Faker.Beer.name, source: Faker.Internet.url, quote: Enum.join([Faker.Beer.style, "style beer", "\nalcohol:", Faker.Beer.alcohol, Faker.Beer.yeast, "yeast and", Faker.Beer.malt, "malt"], " "), is_public: true},
  %{title: Faker.Beer.name, source: Faker.Internet.url, quote: Enum.join([Faker.Beer.style, "style beer", "\nalcohol:", Faker.Beer.alcohol, Faker.Beer.yeast, "yeast and", Faker.Beer.malt, "malt"], " "), is_public: true},
  %{title: Faker.Beer.name, source: Faker.Internet.url, quote: Enum.join([Faker.Beer.style, "style beer", "\nalcohol:", Faker.Beer.alcohol, Faker.Beer.yeast, "yeast and", Faker.Beer.malt, "malt"], " "), is_public: false},
  %{title: Faker.Beer.name, source: Faker.Internet.url, quote: Enum.join([Faker.Beer.style, "style beer", "\nalcohol:", Faker.Beer.alcohol, Faker.Beer.yeast, "yeast and", Faker.Beer.malt, "malt"], " "), is_public: true},
  %{title: Faker.Beer.name, source: Faker.Internet.url, quote: Enum.join([Faker.Beer.style, "style beer", "\nalcohol:", Faker.Beer.alcohol, Faker.Beer.yeast, "yeast and", Faker.Beer.malt, "malt"], " "), is_public: false}
]

# Create the posts and associate them with a user
posts
  |> Enum.map(&User.create_post(&1, user_two))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a user
cs_posts
  |> Enum.map(&User.create_post(&1, user_one))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a user
shak_posts
  |> Enum.map(&User.create_post(&1, user_three))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a user
beer_posts
  |> Enum.map(&User.create_post(&1, user_four))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a Category
Repo.all(assoc(user_one, :posts))
  |> Enum.map(&PostCategory.assoc_post_with_category(&1, category_two))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a Category
Repo.all(assoc(user_two, :posts))
  |> Enum.map(&PostCategory.assoc_post_with_category(&1, category_one))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a Category
Repo.all(assoc(user_three, :posts))
  |> Enum.map(&PostCategory.assoc_post_with_category(&1, category_three))
  |> Enum.each(&Repo.insert!(&1))

# Create the posts and associate them with a Category
Repo.all(assoc(user_four, :posts))
  |> Enum.map(&PostCategory.assoc_post_with_category(&1, category_four))
  |> Enum.each(&Repo.insert!(&1))


post1 = Post |> Repo.get(1)
post2 = Post |> Repo.get(2)
post3 = Post |> Repo.get(3)
post5 = Post |> Repo.get(5)
post7 = Post |> Repo.get(7)
post11 = Post |> Repo.get(11)
post13 = Post |> Repo.get(13)
post17 = Post |> Repo.get(17)
post19 = Post |> Repo.get(19)
post23 = Post |> Repo.get(23)

# Creating comments on Posts
comments = [

]