#ifndef MYDEBUG_H
#define MYDEBUG_H 1

#include <iostream>
#include <vector>
#include <set>
#include <unordered_set>
#include <map>
#include <unordered_map>
#include <functional>
using namespace std; 

void debug(){cout << '*' << endl;}
#define packContainerDbg_SingleArgs(CTR) \
	template<class T> \
	void debug(CTR<T> ctr) \
	{ \
		for(auto& i : ctr) \
			cout << i << ' '; \
	} \
	template<class T, class ... P> \
	void debug(CTR<T> ctr, P ... t) \
	{ \
		for(auto& i : ctr) \
			cout << i << ' '; \
		cout << ", "; \
		debug(t...); \
	}
#define packContainerDbg_DoubleArgs(CTR) \
	template<class T1, class T2> \
	void debug(CTR<T1, T2> ctr) \
	{ \
		for(auto& i : ctr) \
			cout << "{" << i.first << ", " << i.second << "}"; \
	} \
	template<class T1, class T2, class ... P> \
	void debug(CTR<T1, T2> ctr, P ... t) \
	{ \
		for(auto& i : ctr) \
			cout << "{" << i.first << ", " << i.second << "}"; \
		cout << ", "; \
		debug(t...); \
	}

packContainerDbg_SingleArgs(vector);
packContainerDbg_SingleArgs(set);
packContainerDbg_SingleArgs(unordered_set);
packContainerDbg_DoubleArgs(map);
packContainerDbg_DoubleArgs(unordered_set);

template<class R> void debug(R x) {
	cout << x;
}
template<class R, class... T> void debug(R x, T ... t) {
	cout << x << ", ";
	debug(t...);
}
template<class T> void debug(T *x, T *y) {
	while(x != y)
		cout << *x++ << ' ';
}
void ptLine(int LINE) {
	cout << "[LINE : " << LINE << "]";
}
void ptName(string NAME) {
	cout << NAME;
}
template<class ... P> void ptName(string NAME, P ... t) {
	cout << NAME << ", ";
	ptName(t...);
}

#define dbg(...) {cout<<"[DEBUGER]";\
				  ptLine(__LINE__);\
				  cout << "["; ptName(#__VA_ARGS__); cout << "]";\
				  cout << "["; debug(__VA_ARGS__); cout << "]";\
				  cout << endl;}

#endif