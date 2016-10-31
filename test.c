#include <stdio.h>

int x=100;

int main(){
	char *p, *p2;
	p = "PokemonGO";
	p2 = "Niantic";
	char **pp = &p;
	pp = &p2;
}