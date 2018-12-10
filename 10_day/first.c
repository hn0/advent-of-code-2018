/*


*/

#include<cstring>
#include<stdio.h>
#include<stdlib.h>
#include<regex.h>
#include<list>

struct coord {
    int x;
    int y;
    int dx;
    int dy;
};

std::list<coord> points;

void parse_line(char* ln){

    regex_t re;
    size_t max_groups  = 5;
    regmatch_t matches[max_groups];

    // printf("%s\n", ln);

    //position=<-3,  6> velocity=< 2, -1>
    if( !regcomp( &re, ".+<\\s*(-?[0-9]+),\\s*(-?[0-9]+)>.+<\\s*(-?[0-9]+),\\s*(-?[0-9]+).", REG_EXTENDED ) ){

        if( !regexec( &re, ln, max_groups, matches, 0) ){

            struct coord *cptr = (coord*) malloc( sizeof( coord ) );

            for( char i=1; i < max_groups; i+=2 ){
                for( char j=0; j < 2; j++ ){
                    int start = matches[i+j].rm_so;
                    int end   = matches[i+j].rm_eo;
                    char val[end-start + 1];
                    val[end-start] = '\0';
                    strncpy( val, ln + start, end-start );
                    // printf("%d ", atoi( val ) );
                    int* v = (int*) cptr+(i-1+j);
                    *v = atoi( val );
                    // printf(">%d = %s<", *v, val );
                }
                // printf(" %d -> %d ", matches[i].rm_so, matches[i].rm_eo );
                // printf(" %d -> %d ", matches[i+1].rm_so, matches[i+1].rm_eo );
                // printf("\n");
            }
            points.push_back( *cptr );
        }
        else {
            printf("No match!\n");
        }

        regfree( &re );
    }
    else printf("Error compiling expression!\n");
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
        parse_line( ln );
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

    int min = 9999999;
    // int sec = 500000;
    int sec = 10312;
    for( int i = 0; i < sec; i++ ){
        for( std::list<coord>::iterator i = points.begin(); i != points.end(); ++i ){
            // printf(" x: %d y: %d  dx: %d, dy: %d \n", (*i).x, (*i).y, (*i).dx, (*i).dy );
            (*i).x += (*i).dx;
            (*i).y += (*i).dy;
            // printf(" x: %d y: %d  dx: %d, dy: %d \n", (*i).x, (*i).y, (*i).dx, (*i).dy );
            // printf("\n");
        }

        int range[4] = {0, 0, 0, 0};
        for( std::list<coord>::iterator i = points.begin(); i != points.end(); ++i ){
            range[0] = (range[0] < (*i).x) ? range[0] : (*i).x;
            range[1] = (range[1] > (*i).x) ? range[1] : (*i).x;
            range[2] = (range[2] < (*i).y) ? range[2] : (*i).y;
            range[3] = (range[3] > (*i).y) ? range[3] : (*i).y;
        }
        // int r = range[1] - range[0] + range[3] - range[2];
        // if( r <= min ){
        //     min = r;
        //     printf("%d. %d ->", i, r);
        //     for( int v:range )
        //         printf("%d ", v);
        //     printf("\n");
        // }

    }


    // for( std::list<coord>::iterator i = points.begin(); i != points.end(); ++i ){
    //         printf(" x: %d y: %d  dx: %d, dy: %d \n", (*i).x, (*i).y, (*i).dx, (*i).dy );
    // }


    // return 0;
    // a bit manual! but it will work, feeling lazy today
    // 10311. 343 ->0 222 0 121 
    int range[4] = {150, 250, 90, 130};
    for( int j=range[2]; j < range[3]; j++ ){
        for( int i=range[0]; i < range[1]; i++ ){
            char v[2] = { '.', '\0' };
            for( std::list<coord>::iterator c = points.begin(); c != points.end(); ++c ){
                if( (*c).y == j && (*c).x == i )
                    v[0] = '#';
            }
            printf("%s", v);
        }
        printf("\n");
    }

    return 0;
}