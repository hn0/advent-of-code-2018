/*


*/

#include<stdio.h>
#include<stdlib.h>
#include<regex.h>
#include<string.h>
#include<list>
#include<algorithm>


int particular_rules(int n_players, int max_value){

    std::list<int> current;
    current.push_back( 0 );

    auto next = [&] (auto i){
        if( ++i == current.end() )
            return current.begin();
        return i;
    };

    auto prev = [&] (auto i){
        for( int j=0; j < 7; j++ ){
            if( i == current.begin() )
                i = current.end();
            i--;
        }
        return i;
    };


    int scores[n_players];
    for( int i=0; i < n_players; i++ )
        scores[i] = 0;

    auto c = current.begin();
    for( int marble = 1; marble < max_value + 1; ++marble ){
        if( marble > 0 && marble % 23 == 0 ){
            c = prev(c);
            scores[marble % n_players] += (marble + *c);
            c = current.erase( c );
        }
        else {
            c = current.insert( next(next(c)), marble );
        }
        // for( int x : current )
        //     printf("%d ", x);
        // printf("\n");
    }

    // find max score!
    int value = 0;
    for( int i=0; i < n_players; i++ )
        value = ( value > scores[i] ) ? value : scores[i];

    return value;
}

void parse_line(char* ln, int* n_players, int* max_value){
    regex_t re;
    size_t max_groups  = 3;
    regmatch_t matches[max_groups];

    if( !regcomp( &re, "([0-9]*) players; last marble is worth ([0-9]*) points", REG_EXTENDED ) ){

        if( !regexec( &re, ln, max_groups, matches, 0) ){
            for( char i = 1; i < 3; i++ ){
                int start = matches[i].rm_so;
                int end   = matches[i].rm_eo;
                char val[end-start + 1];
                val[end-start + 1] = '\0';

                strncpy( val, ln + start, end-start );
                // printf("%s\n", val );
                if( i == 1 ){
                    *n_players = atoi( val );
                }
                else{
                    *max_value = atoi( val );
                }
            }
        }
        else {
            printf("No match!\n");
        }

        regfree( &re );
    }

}

int read_input(){

    FILE* fp;
    char* ln = NULL;
    size_t len = 0;
    ssize_t read;

    fp = fopen( "first_data", "r" );
    if( fp == NULL )
        return 0;

    while( ( read = getline(&ln, &len, fp) ) != -1 ){
        // printf( "%s\n", ln );
        int n_players, max_value;
        parse_line( ln, &n_players, &max_value );
        printf(" Got values: %d and %d. And solution is %d \n", n_players, max_value, particular_rules( n_players, max_value ) );
    }

    fclose( fp );
    if( ln )
        free( ln );

    return 1;
}

int main(){

    if( !read_input() ){
        printf("Error reading input file!\n");
        return 1;
    }

    return 0;
}